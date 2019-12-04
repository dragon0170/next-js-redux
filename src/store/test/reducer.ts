import { createReducer } from 'typesafe-actions';
import { Map } from 'immutable';
import { SIGN_IN_SUCCESS, CHANGE_NICKNAME, SIGN_IN_FAILURE } from './action';

export const initialTestState = Map({
  nickname: '',
  error: '',
});

export type TestState = typeof initialTestState;

export default createReducer<TestState>(initialTestState, {
  [SIGN_IN_SUCCESS]: (state, action): TestState => {
    return state.set('nickname', action.payload.nickname);
  },
  [SIGN_IN_FAILURE]: (state, action): TestState => {
    return state.set('error', action.payload.message);
  },
  [CHANGE_NICKNAME]: (state, action): TestState => {
    return state.set('nickname', action.payload);
  },
});
