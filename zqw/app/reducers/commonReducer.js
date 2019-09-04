import * as types from '../constants/commonTypes';

const initialState = {
  batch: 0,
  index: 0,
  data: {},
  info: {}
}

export default function common(state=initialState, action) {
  switch (action.type) {
    case types.SETBATCH:
      return Object.assign({}, state, {
        batch: action.batch
      })
    case types.SETINDEX:
      return Object.assign({}, state, {
        index: action.index
      })
    case types.SETDATA:
      return Object.assign({}, state, {
        data: action.data
      })
    case types.SETREPLACE:
      return Object.assign({}, state, {
        info: action.info
      })
    default:
      return state;
  }
}
