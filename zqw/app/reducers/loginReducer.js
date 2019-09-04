'use strict';
import * as types from '../constants/loginTypes';

const initialState = {
  token: '',
}

export default function login(state=initialState, action) {
  switch (action.type) {
    case types.SET_TOKEN:
       return Object.assign({}, state, {
        token: action.token
      })
      break;
    default:
      return state;
  }
}
