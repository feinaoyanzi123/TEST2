import * as types from '../constants/loginTypes';

const setToken = (token) => {
  return {
    type: types.SET_TOKEN,
    token: token,
  }
}

export {
  setToken,
}
