import { server } from './consts';
import axios from 'axios';
import { setAccTransData } from './accountTransactions'
// Action Types
const SENDPUBLICTOK = 'SENDPUBLICTOK';
const UPDATEACC = 'UPDATEACC'

// Action Creators
const sendPublicToken = token => ({ type: SENDPUBLICTOK, token });

let axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
}

export const sendTok = (token, userId) => {
  return async dispatch => {
    try {
      const resp = await axios.post(`${server}/api/plaid/plaidExchange`,{public_token: token, id: userId}, axiosConfig)
      console.log(resp.data.trans)
      dispatch(sendPublicToken(resp.data));
    } catch (err) {
      console.log('Error sending public token: ', err.message);
    }
  };
};

export const getLatestAccData = (userId) => {
  console.log(userId)
  return async dispatch => {
    try {
      const resp = await axios.get(`${server}/api/plaid/${userId}`,{config: axiosConfig})
      console.log(resp.data)
      //dispatch(setAccTransData(resp.data));
    } catch (err) {
      console.log('Error updating info: ', err.message);
    }
  };
};

const initialToken = [];

export default (state = initialToken, action) => {
  switch (action.type) {
    case SENDPUBLICTOK:
      return action.token;
    default:
      return state;
  }
};