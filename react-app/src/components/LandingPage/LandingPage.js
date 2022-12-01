import React, { useState, useEffect } from 'react';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from "../../store/playlist"
import * as audioActions from "../../store/audioplayer"
import "./LandingPage.css"
const LandingPage = () => {
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])
    const dispatch = useDispatch()
    const songState = useSelector((state) => state)
    document.body.style = 'background: #1e1e1e';
    console.log("SONGSTATE: ", songState)
    useEffect(() => {
        (async () => {
            const allArtistsRes = await fetch("/api/artists/")
            const allArtists = await allArtistsRes.json()
            setArtists(allArtists.artists)
        })();
        (async () => {
            const allAlbumsRes = await fetch("/api/albums")
            const allAlbums = await allAlbumsRes.json()
            setAlbums(allAlbums.albums)
        })();
        (async () => {
            const allPlaylists = await dispatch(playlistActions.getAllPlaylists())
            setPlaylists(allPlaylists)
        })();
    }, [setArtists, setAlbums, setPlaylists, dispatch])
    if (!artists) {
        return null
    }
    if (!albums) {
        return null
    }
    if (!playlists) {
        return null
    }
    console.log("PLAYLISTS", playlists)
    return (
        <div className='landing-page-container'>
            <h1>WELCOME TO BOPIFY</h1>
            <h2>Artists</h2>
            <div className='artist-landing-container'>
                {artists.map((artist) => {
                    return <div className='artist-image-container'>
                        <Link to={`/artist/${artist.id}`}>
                            <img className='landing-page-image' src={artist.artist_img} />
                        </Link>
                        <div>{artist.name}</div>
                    </div>
                })}
            </div>
            <br />
            <br />
            <br />
            <br />
            <h2>Albums</h2>
            <div className='album-container'>
                {albums.map((album) => {
                    return <div className='album-image-container'>
                        <Link to={`/album/${album.id}`}>
                            <img className='landing-page-image' src={album.albumPic} />
                        </Link>
                        <div>{album.name}</div>
                    </div>
                })}
            </div>
            <br />
            <br />
            <br />
            <br />
            <h2>Playlists</h2>
            <div className='landing-page-playlist-container' style={{ paddingBottom: "80px" }}>
                {playlists && (
                    playlists.map((playlist) => {
                        return <div className='playlist-image-container'>
                            <Link to={`/playlist/${playlist.id}`}>
                                <img className='landing-page-image' src={playlist.playlist_img} />
                            </Link>
                            <div>{playlist.name}</div>
                        </div>
                    })
                )}
            </div>
        </div>
    )
}


export default LandingPage;
