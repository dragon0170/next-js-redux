import { put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { signInAPI } from 'store/test/api';
import {
  actionCreators,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
} from './action';

function* signInSaga(
  action: ReturnType<typeof actionCreators.signIn>,
): SagaIterator {
  try {
    const response = yield call(signInAPI);
    yield put({ type: SIGN_IN_SUCCESS, payload: response.data });
  } catch (e) {
    yield put({ type: SIGN_IN_FAILURE, payload: e.response.data });
  }
}

export default function* MyPageSaga(): SagaIterator {
  yield takeEvery(SIGN_IN, signInSaga);
}
