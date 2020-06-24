import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";

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

const persistConfig = {
  key: 'truckeria',
  storage: localStorage,
  whitelist: ['auth', 'user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


let store = createStore(persistedReducer, middlewares);
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
