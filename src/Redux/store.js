import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/_root.reducer';







const store = createStore(
  rootReducer,

  applyMiddleware(),
);


export default store;