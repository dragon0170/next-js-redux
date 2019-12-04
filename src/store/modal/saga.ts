import { put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { SHOW_ERROR_ALERT } from 'store/modal/action';

function* handleFailureSaga(action): SagaIterator {
  if (action.payload.showAlert) {
    yield put({ type: SHOW_ERROR_ALERT, payload: action.payload.message });
  }
}

export default function* ModalSaga(): SagaIterator {
  yield takeEvery((action: any) => {
    return action.type.endsWith('_FAILURE');
  }, handleFailureSaga);
}
