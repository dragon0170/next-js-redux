import { createReducer } from 'typesafe-actions';
import { Map } from 'immutable';
import { GET_INFO_SUCCESS, CHANGE_NICKNAME } from './action';

const initialState = Map({
  nickname: '',
});

export type TestState = typeof initialState;

export default createReducer<TestState>(initialState, {
  [GET_INFO_SUCCESS]: (state, action): TestState => {
    return state.set('nickname', action.payload.nickname);
  },
  [CHANGE_NICKNAME]: (state, action): TestState => {
    return state.set('nickname', action.payload);
  },
});
