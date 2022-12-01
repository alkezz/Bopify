import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"


const AlbumPage = () => {
    let i = 0
    const [album, setAlbum] = useState([])
    const { albumId } = useParams()
    useEffect(() => {
        (async () => {
            const albumResponse = await fetch(`/api/albums/${albumId}`)
            const albumData = await albumResponse.json()
            setAlbum(albumData)
        })();
    }, [setAlbum, albumId])
    console.log("ALBUM", album)
    const incrementSongNumber = () => {
        i = i + 1
        console.log('yo')
        return i
    }
    return (
        <>
            {!!album && (
                <div className='album-page-container' style={{ color: "white", paddingBottom: "80px" }}>
                    <div className='album-top-header' style={{ backgroundColor: "#393939", display: "flex", flexDirection: "row" }}>
                        <div className='album-image'>
                            <img src={album?.albumPic}></img>
                        </div>
                        <div className='album-info'>
                            ALBUM
                            <div className='album-name' style={{ fontSize: "60px", fontWeight: "700" }}>
                                {album?.name}
                            </div>
                            <div className='album-artist'>
                                <Link to={`/artist/${album?.artist?.id}`}>{album?.artist?.name}</Link><span>.</span> {album?.year} <span>.</span> {album?.Songs?.length} songs
                            </div>
                        </div>
                    </div>
                    <div className='play-like-container'>
                        <div>
                            <button style={{ backgroundColor: "#1e1e1e", border: "none" }}>
                                <i style={{ color: "#1ed760" }} class="fa-solid fa-circle-play fa-4x"></i>
                            </button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='song-list-header-container' style={{ marginBottom: "10px" }}>
                        <div className='number-icon'>
                            <div>
                                #
                                &nbsp;
                                &nbsp;
                                TITLE
                            </div>
                        </div>
                        <div style={{ paddingRight: "20px" }}>
                            <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    <div>
                        {/* {onePlaylist.Songs.map((song) => {
                                return <div style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "300px" }}>
                                        {incrementSongNumber()} <Link to={{ pathname: song.song_url }}>{song.name}</Link>
                                    </div>
                                    </div>
                            } */}
                        {album?.Songs?.map((song) => {
                            return <div style={{ paddingBottom: "10px", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                                <div style={{ width: "300px", display: "flex", flexDirection: "row" }}>
                                    {incrementSongNumber()}
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Link to={{ pathname: song.song_url }}>{song.name}</Link>
                                        {album.artist.name}
                                    </div>
                                </div>
                                <div>
                                    <i style={{ paddingRight: "20px", color: "#babbbb" }} class="fa-regular fa-heart"></i>
                                    time
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default AlbumPage
