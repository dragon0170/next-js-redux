import { createReducer } from 'typesafe-actions';
import { Map } from 'immutable';
import { SHOW_ERROR_ALERT } from 'store/modal/action';

export const initialModalState = Map({});

export type ModalState = typeof initialModalState;

export default createReducer<ModalState>(initialModalState, {
  [SHOW_ERROR_ALERT]: (state, action): ModalState => {
    alert(action.payload);
    return state;
  },
});
