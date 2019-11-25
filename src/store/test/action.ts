import { createAction } from 'typesafe-actions';

export const GET_INFO = 'test/GET_INFO';
export const GET_INFO_SUCCESS = 'test/GET_INFO_SUCCESS';
export const GET_INFO_FAILURE = 'test/GET_INFO_FAILURE';

export const CHANGE_NICKNAME = 'test/CHANGE_NICKNAME';

export const actionCreators = {
  getInfo: createAction(GET_INFO)(),
  changeNickname: createAction(CHANGE_NICKNAME)<string>(),
};
