import { createReducer } from 'typesafe-actions';
import { Map } from 'immutable';
import { GET_INFO_SUCCESS, CHANGE_NICKNAME, GET_INFO_FAILURE } from './action';

export const initialTestState = Map({
  nickname: '',
  error: '',
});

export type TestState = typeof initialTestState;

export default createReducer<TestState>(initialTestState, {
  [GET_INFO_SUCCESS]: (state, action): TestState => {
    return state.set('nickname', action.payload.nickname);
  },
  [GET_INFO_FAILURE]: (state, action): TestState => {
    return state.set('error', action.payload.msg);
  },
  [CHANGE_NICKNAME]: (state, action): TestState => {
    return state.set('nickname', action.payload);
  },
});
