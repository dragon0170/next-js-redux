import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import test, { initialTestState, TestState } from 'store/test/reducer';
import TestSaga from 'store/test/saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS } from 'immutable';

export interface StoreState {
  test: TestState;
}

interface SerializedStoreState {
  test: object;
}

export function serialize(state: StoreState): SerializedStoreState {
  if (state) {
    return {
      test: state.test.toJS(),
    };
  }
  return {
    test,
  };
}

export function deserialize(state: SerializedStoreState): StoreState {
  if (state) {
    return {
      test: fromJS(state.test),
    };
  }
  return {
    test: initialTestState,
  };
}

const modules = combineReducers<StoreState>({
  test,
});

function* rootSaga(): any {
  yield all([TestSaga()]);
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
