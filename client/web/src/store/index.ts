import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import rootReducer from './modules/rootReducers';
import rootSaga from './modules/rootSaga';

declare global {
  interface Console {
    tron: any;
  }
}

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleare = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleare];

const store = createStore(rootReducer, middlewares);

sagaMiddleare.run(rootSaga);

export default store;
