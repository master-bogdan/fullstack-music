import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from './trackTypes';
import axios from 'axios'


export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const repsonse = await axios.get('http://localhost:5000/tracks');
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: repsonse.data,
      })
    } catch (error) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Tracks fetch error'
      })
    }
  }
}

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const repsonse = await axios.get(`http://localhost:5000/tracks/search?query=${query}`);
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS,
        payload: repsonse.data,
      })
    } catch (error) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Tracks fetch error'
      })
    }
  }
}
