import { createReducer } from 'typesafe-actions';
import { TestState, GET_INFO_SUCCESS, CHANGE_NICKNAME } from './action';

const initialState: TestState = {
  nickname: '',
};

export default createReducer<TestState>(initialState, {
  [GET_INFO_SUCCESS]: (state, action): TestState => {
    return {
      nickname: action.payload.nickname,
    };
  },
  [CHANGE_NICKNAME]: (state, action): TestState => {
    return {
      nickname: action.payload,
    };
  },
});
