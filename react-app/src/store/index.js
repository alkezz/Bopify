import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import playlist from './playlist';
import follows from './follower';
import audioPlayer from './audioplayer'
import followedPlaylists from './followedplaylists'
import likedSongReducer from './songlikes';

const rootReducer = combineReducers({
  session,
  playlist,
  follows,
  audioPlayer,
  followedPlaylists,
  likedSongReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
