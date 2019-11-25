import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import test, { TestState } from 'store/test/reducer';
import TestSaga from 'store/test/saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS } from 'immutable';

export class StoreState {
  test: TestState;
}

class SerializedStoreState {
  test;
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

export function serialize(state: StoreState): SerializedStoreState {
  if (state) {
    return {
      test: state.test.toJS(),
    };
  }
  return new SerializedStoreState();
}

export function deserialize(state: SerializedStoreState): StoreState {
  if (state) {
    return {
      test: fromJS(state.test),
    };
  }
  return new StoreState();
}

export default function configureStore(
  initialState,
  { isServer, req = null },
): Store<StoreState> {
  const sagaMiddleware = createSagaMiddleware();
  const store: any = createStore(
    modules,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store;
}
