import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import user from './user';
import budget from './budget'
import accTrans from './accountTransactions'
import plaid from './token'
import thunk from 'redux-thunk';

const initialState = {};
const middleWare = [thunk];
const composeEnhancers = compose;

const reducer = combineReducers({ user, budget, accTrans, plaid });

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleWare)));

export default store;