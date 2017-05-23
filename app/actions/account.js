import * as types from './types'
import Api from '../lib/api'

export function fetchAccountNumbers() {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_ACCOUNT_NUMBERS,
      accountNumbers : [1111]
    });
  }
}
