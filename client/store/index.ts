import { createStore, combineReducers, applyMiddleware, AnyAction } from 'redux';
import {
  HYDRATE,
  createWrapper,
  Context,
  MakeStore,
} from 'next-redux-wrapper';
import { playerReducer } from './player/playerReducer';
import { trackReducer } from './track/trackReducer';
import thunk, { ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
  player: playerReducer,
  tracks: trackReducer,
})

// SSR Reducer
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
