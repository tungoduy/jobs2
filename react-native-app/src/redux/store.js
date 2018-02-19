import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['likedJobs'] // only likedJobs will be persisted
  };

const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
let persistor = persistStore(store);

export default { store, persistor };