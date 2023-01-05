import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useHistory, useParams, useLocation } from 'react-router-dom';
import * as playlistActions from "../../store/playlist"
import "./Search.css"

const Search = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [songs, setSongs] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [users, setUsers] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [searchShow, setSearchShow] = useState(false)
    const [showAlbums, setShowAlbums] = useState(false)
    useEffect(() => {
        (async () => {
            const data = await dispatch(playlistActions.getAllPlaylists())
            setPlaylists(data)
        })();
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
            const allSongsRes = await fetch("/api/songs")
            const allSongs = await allSongsRes.json()
            setSongs(allSongs.songs)
        })();
        (async () => {
            const allUsersRes = await fetch("/api/users")
            const allUsers = await allUsersRes.json()
            setUsers(allUsers)
        })();
    }, [dispatch, fetch, setPlaylists, setAlbums, setArtists, setSongs, setUsers, searchShow])
    console.log("users", users)
    console.log("playlists", playlists)
    console.log("albums", albums)
    console.log("artists", artists)
    console.log("songs", songs)
    const handleInput = (e) => {
        setSearchInput(e.target.value)
        if (e.target.value === "") {
            setSearchShow(false)
        } else {
            setSearchShow(true)
        }
    }
    return (
        <div style={{ paddingBottom: "80px" }}>
            <input
                type='search'
                placeholder='What do you want to listen to?'
                onChange={handleInput}
                value={searchInput}
                style={{ marginLeft: "4%", marginTop: "20px", paddingLeft: "35px", borderRadius: "25px", height: "45px", position: "sticky", top: "2px", border: "none" }}>
            </input>
            <i id='search-button-icon' type='submit' class="fa-solid fa-magnifying-glass"></i>
            <h1 hidden={searchShow ? false : true} style={{ marginLeft: "30px", color: "white" }}>Albums</h1>
            <div style={{ display: "flex" }}>
                {albums.filter(album => {
                    if (searchInput === "") {
                        return album
                    } else if (album.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return album
                    }
                }).map((album, index) => (
                    searchShow === true && (
                        <div onClick={(e) => history.push(`/album/${album.id}`)} className='album-cards' key={index}>
                            <img className='album-image' src={album.albumPic} />
                            <p style={{ marginLeft: "15px", fontWeight: "700" }}>{album.name}</p>
                            <span style={{ marginLeft: "15px", paddingBottom: "20px" }}>{album.year} - {album.artist.name}</span>
                        </div>
                    )
                ))}
            </div>
            <h1 hidden={searchShow ? false : true} style={{ marginLeft: "30px", color: "white" }}>Artists</h1>
            <div style={{ display: "flex" }}>
                {artists.filter(artist => {
                    if (searchInput === "") {
                        return artist
                    } else if (artist.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return artist
                    }
                }).map((artist, index) => (
                    searchShow === true && (
                        <div onClick={(e) => history.push(`/artist/${artist.id}`)} className='album-cards' key={index}>
                            <img className='artist-image' src={artist.artist_img} />
                            <p style={{ marginLeft: "15px", fontWeight: "700" }}>{artist.name}</p>
                        </div>
                    )
                ))}
            </div>
            <h1 hidden={searchShow ? false : true} style={{ marginLeft: "30px", color: "white" }}>Public Playlists</h1>
            <div style={{ display: "flex" }}>
                {playlists.filter(playlist => {
                    if (searchInput === "") {
                        return playlist
                    } else if (playlist.name.toLowerCase().includes(searchInput.toLowerCase())) {
                        return playlist
                    }
                }).map((playlist, index) => (
                    searchShow === true && (
                        <div onClick={(e) => history.push(`/playlist/${playlist.id}`)} className='album-cards' key={index}>
                            <img className='album-image' src={playlist.playlist_img} />
                            <p style={{ marginLeft: "15px", fontWeight: "700" }}>{playlist.name}</p>
                            <span style={{ marginLeft: "15px", paddingBottom: "20px" }}>By {playlist.User.username}</span>
                        </div>
                    )
                ))}
            </div>
        </div>

    )
}

export default Search
