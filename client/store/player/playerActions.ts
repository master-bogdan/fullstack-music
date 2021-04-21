import { ITrack } from 'types/track';
import { PlayerAction, PlayerActionTypes } from './playerTypes';

const playTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY }
}

const pauseTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE }
}

const setDuration = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload }
}

const setVolume = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload }
}

const setCurrentTime = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload }
}

const setActiveTrack = (payload: ITrack): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload }
}

const PlayerActionCreators = {
  playTrack,
  pauseTrack,
  setDuration,
  setVolume,
  setCurrentTime,
  setActiveTrack,
}

export default PlayerActionCreators;
