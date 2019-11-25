import { put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  actionCreators,
  GET_INFO,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
} from './action';

function* getInfoSaga(
  action: ReturnType<typeof actionCreators.getInfo>,
): SagaIterator {
  try {
    const response = {
      data: {
        nickname: 'kevin',
      },
    };
    yield put({ type: GET_INFO_SUCCESS, payload: response.data });
  } catch (e) {
    yield put({ type: GET_INFO_FAILURE, payload: e });
  }
}

export default function* MyPageSaga(): SagaIterator {
  yield takeEvery(GET_INFO, getInfoSaga);
}
