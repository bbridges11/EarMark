import { server } from './index';
import axios from 'axios';
//ACTION TYPES
const GETUSER = 'GETUSER';
const DELETEUSER = 'DELETEUSER';

let axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}
//ACTION FUNCTIONS
const getUser = user => ({ type: GETUSER, user });
const deleteUser = () => ({ type: DELETEUSER });

//  THUNK CREATOR ACTIONS

export const signup = (userObject) => dispatch => {
  axios.post(`${server}/auth/signup`, userObject, axiosConfig).then(r => {
    dispatch(getUser(r.data))
  })
}

export const login = (email, passWord, nav, pushTok) => dispatch => {
  axios.post(`${server}/auth/login`, {email, passWord, pushTok}).then(r => {
    dispatch(getUser(r.data))
    nav.navigate('Home', { title: 'Home' });
  })
}

//REDUCER

export default (state = {}, action) => {
  switch (action.type) {
    case GETUSER:
      return action.user;
    case DELETEUSER:
      return {};
    default:
      return state;
  }
}