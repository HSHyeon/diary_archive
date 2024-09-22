import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { diaryReducer } from './reducer';

const store = createStore(diaryReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch; 

export default store;
