import { createAction } from 'typesafe-actions';

export const SIGN_IN = 'test/SIGN_IN';
export const SIGN_IN_SUCCESS = 'test/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'test/SIGN_IN_FAILURE';

export const CHANGE_NICKNAME = 'test/CHANGE_NICKNAME';

export const actionCreators = {
  signIn: createAction(SIGN_IN)(),
  changeNickname: createAction(CHANGE_NICKNAME)<string>(),
};
