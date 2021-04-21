import { ITrack } from "types/track";


export interface TrackState {
  tracks: ITrack[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS,
  payload: ITrack[]
}

interface FetchTracksError {
  type: TrackActionTypes.FETCH_TRACKS_ERROR,
  payload: string
}

export type TrackAction = FetchTracksAction | FetchTracksError;
