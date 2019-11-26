import { createReducer } from 'typesafe-actions';
import { Map } from 'immutable';
import { GET_INFO_SUCCESS, CHANGE_NICKNAME } from './action';

export const initialTestState = Map({
  nickname: '',
});

export type TestState = typeof initialTestState;

export default createReducer<TestState>(initialTestState, {
  [GET_INFO_SUCCESS]: (state, action): TestState => {
    return state.set('nickname', action.payload.nickname);
  },
  [CHANGE_NICKNAME]: (state, action): TestState => {
    return state.set('nickname', action.payload);
  },
});
