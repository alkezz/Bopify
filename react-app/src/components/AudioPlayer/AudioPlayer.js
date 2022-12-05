import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import DropDown from '../AccountDropDown/AccounDropDown';
import UserPlaylist from '../UserPlaylists/UserPlaylists';
import logo from "../../assets/black_bopify_logo-removebg-preview.png"
import whiteLogo from "../../assets/bopify-white-logo.png"
import { useDispatch, useSelector } from 'react-redux';
import greenLogo from "../../assets/new_bopify_logo-removebg-preview.png"
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import * as followedPlaylistActions from "../../store/followedplaylists"
import ReactAudioPlayer from 'react-audio-player';
import "./AudioPlayer.css"

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [current_track, setCurrentTrack] = useState(0);
    const [trackProgress, setTrackProgress] = useState()
    const [volume, setVolume] = useState(0)
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)
    const playlistState = useSelector((state) => state.playlist)
    const audioState = useSelector((state) => state.audioPlayer)
    const audioRef = useRef(new Audio(audioState?.current_song_playing[0]?.song_url));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const { duration } = audioRef.current;
    console.log("VOLUME", volume)
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            audioRef.current.volume = volume
            startTimer()
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);
    useEffect(() => {
        audioRef.current.pause()
        audioRef.current = new Audio(audioState?.current_song_playing[0]?.song_url)
        setTrackProgress(audioRef.current.currentTime)
        setVolume(0.01)
        if (isReady.current) {
            audioRef.current.play()
            setIsPlaying(true)
            setVolume(0.01)
            startTimer()
        } else {
            isReady.current = true
        }
    }, [audioState?.current_song_playing[0]?.song_url])

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;


    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMins = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMins}:${returnedSeconds}`;
    }

    const onScrub = (val) => {
        clearInterval(intervalRef.current)
        audioRef.current.currentTime = val
        setTrackProgress(audioRef.current.currentTime)
    }

    const onScrubEnd = () => {
        if (!isPlaying) {
            setIsPlaying(true)
        }
        startTimer()
    }

    const onVolumeChange = (val) => {
        audioRef.current.volume = val
        setVolume(val)
    }
    const startTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                skipSong()
                audioRef.current.volume = volume
                setVolume(volume)
            } else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, [1000])
    }
    const skipSong = async () => {
        if (audioState.queue.length > 0) {
            await dispatch(audioActions.skipSong())
            setCurrentTrack(audioState.current_song_playing[0].song_url)
            setVolume(volume)
            audioRef.current.volume = volume
        } else {
            await dispatch(audioActions.skipSong())
        }
    }

    const goBack = () => {
        setIsPlaying(false)
        setCurrentTrack(audioState.current_song_playing[0].song_url)
        setTrackProgress(0)
        audioRef.current.currentTime = 0
        setVolume(volume)
        audioRef.current.volume = volume
    }

    let skipSongButton
    if (audioState.queue) {
        skipSongButton = (
            <button style={{ background: "none", border: "none" }} onClick={skipSong}>
                <i class="fa-solid fa-forward fa-2x"></i>
            </button>
        )
    }
    let backButton
    if (audioState.current_song_playing) {
        backButton = (
            <button style={{ background: "none", border: "none" }} onClick={goBack}>
                <i class="fa-solid fa-backward fa-2x"></i>
            </button>
        )
    }
    let playPauseButton
    if (isPlaying === true) {
        playPauseButton = (
            <button style={{ background: "none", border: "none" }} onClick={() => setIsPlaying(false)}>
                <i class="fa-solid fa-circle-pause fa-3x"></i>
            </button>
        )
    } else {
        // setIsPlaying(true)
        playPauseButton = (
            <button style={{ background: "none", border: "none" }} onClick={() => setIsPlaying(true)}>
                <i class="fa-solid fa-circle-play fa-3x"></i>
            </button>
        )
    }

    let volumeButton
    if (audioRef.current.volume !== 0) {
        volumeButton = (
            <button style={{ marginTop: "20px", display: "flex", alignItems: "center", background: "none", border: "none" }} onClick={(e) => audioRef.current.volume = 0}>
                <i class="fa-solid fa-volume-low"></i>
            </button>
        )
    } else {
        volumeButton = (
            <button style={{ marginTop: "20px", display: "flex", alignItems: "center", background: "none", border: "none" }} onClick={(e) => { setVolume(volume); audioRef.current.volume = volume; }}>
                <i class="fa-solid fa-volume-xmark"></i>
            </button>
        )
    }

    return (
        <>

            <div>
                <div style={{ marginLeft: "400px" }}>
                    {backButton}
                    {playPauseButton}
                    {skipSongButton}
                </div>
                <div style={{ marginTop: "-10px", marginLeft: "250px", display: "flex" }}>
                    <span style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>{calculateTime(trackProgress)}</span>
                    &nbsp;
                    <div className='track-length-range'>
                        <input
                            type='range'
                            value={trackProgress}
                            step="1"
                            min="0"
                            max={duration ? duration : `${duration}`}
                            onChange={(e) => onScrub(e.target.value)}
                            onMouseUp={onScrubEnd}
                            onKeyUp={onScrubEnd}
                            style={{ background: trackStyling }}
                        />
                    </div>
                    &nbsp;
                    {isPlaying && (
                        <span hidden={!duration} style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>{calculateTime(duration)}</span>
                    )}
                    {/* <span style={{ display: "flex", alignItems: "center" }}><i class="fa-solid fa-volume-low"></i></span> */}
                    {volumeButton}
                    &nbsp;
                    &nbsp;
                    <div className='volume-range'>
                        <input
                            type='range'
                            value={volume}
                            step="0.01"
                            min="0"
                            max="1"
                            onChange={(e) => onVolumeChange(e.target.value)}
                            style={{ width: "100px", display: "flex" }}
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default AudioPlayer
