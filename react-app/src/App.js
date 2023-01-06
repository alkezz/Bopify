import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
import ArtistPage from './components/ArtistPage/ArtistPage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import AccountPage from './components/AccountPage/AccountPage';
import LikedSongs from './components/LikedSongs/LikedSongs';
import Search from './components/Search/Search';
import Library from './components/Library/Library';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import FourZeroFourPage from './components/404Page/404Page';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import "./App.css"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/test'>
          <AudioPlayer />
        </Route>
        <Route path='/likes'>
          <LikedSongs />
        </Route>
        <Route path='/library'>
          <Library />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/artist/:artistId' exact={true}>
          <ArtistPage />
        </Route>
        <Route path='/playlist/:playlistId' exact={true}>
          <PlaylistPage />
        </Route>
        <Route path='/album/:albumId' exact={true}>
          <AlbumPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <Route path='/user/:userId' exact={true} >
          <AccountPage />
        </Route>
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>
        <Route path="*">
          <FourZeroFourPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
