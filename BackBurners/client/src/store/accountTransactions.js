import { server } from './consts';
import axios from 'axios'
let axiosConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
}

// Action Types
const SETACCTTRANSDATA = 'SETACCTTRANSDATA';
const ADDTRANS = 'ADDTRANS';

// Action Creators
export const setAccTransData = data => ({ type: SETACCTTRANSDATA, data });
const addTrans = transaction => ({ type: ADDTRANS, transaction });

export const getAccTransData = (id) => {
    return async dispatch => {
      try {
        const resp = await axios.get(`${server}/api/accTrans/${id}`, axiosConfig);
        //console.log(resp.data)
        dispatch(setAccTransData(resp.data));
      } catch (err) {
        console.log('Error fetching acct & trans data: ', err.message);
      }
    };
};

export const updateAccTrans = newTrans => {
    return async dispatch => {
        try {
            const resp = await axios.post(`${server}/api/accTrans`, newTrans, axiosConfig);
            //console.log('yooo', resp.data)
            dispatch(addTrans(resp.data));
        } catch (err) {
            console.log('Error updating transaction: ', err.message);
        }
    };
};

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETACCTTRANSDATA:
            return action.data;
        case ADDTRANS:
            return {
                ...state,
                trans: [...state.trans, action.transaction.trans]
            };
        default:
            return state;
    }
};