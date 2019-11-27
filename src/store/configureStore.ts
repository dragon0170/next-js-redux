import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import test, { initialTestState, TestState } from 'store/test/reducer';
import modal, { initialModalState, ModalState } from 'store/modal/reducer';
import TestSaga from 'store/test/saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS } from 'immutable';
import ModalSaga from 'store/modal/saga';

export interface StoreState {
  test: TestState;
  modal: ModalState;
}

interface SerializedStoreState {
  test: object;
  modal: object;
}

export function serialize(state: StoreState): SerializedStoreState {
  if (state) {
    return {
      test: state.test.toJS(),
      modal: state.modal,
    };
  }
  return {
    test,
    modal,
  };
}

export function deserialize(state: SerializedStoreState): StoreState {
  if (state) {
    return {
      test: fromJS(state.test),
      modal: fromJS(state.modal),
    };
  }
  return {
    test: initialTestState,
    modal: initialModalState,
  };
}

const modules = combineReducers<StoreState>({
  test,
  modal,
});

function* rootSaga(): any {
  yield all([TestSaga(), ModalSaga()]);
}

const bindMiddleware = (middleware): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export default function configureStore(
  preloadedState,
  { isServer, req = null },
): Store<StoreState> {
  const sagaMiddleware = createSagaMiddleware();
  const store: any = createStore(
    modules,
    preloadedState,
    bindMiddleware([sagaMiddleware]),
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
}
