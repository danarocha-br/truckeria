import createSagaMiddleware from 'redux-saga';

import createStore from './createStore.js';
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

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export default store;
