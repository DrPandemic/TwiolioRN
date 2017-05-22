import * as types from './types'
import Api from '../lib/api'

// export function fetchRecipes(ingredients) {
//   return (dispatch, getState) => {
//     const params = [
//       `i=${encodeURIComponent(ingredients)}`,
//       'p=1'
//     ].join('&')
//     return Api.get(`/api/?${params}`).then(resp => {
//       dispatch(setSearchedRecipes({recipes: resp}));
//     }).catch( (ex) => {
//       console.log(ex);
//     });
//   }
// }

export function fetchAccountNumbers() {
  return (dispatch, getState) => {
    dispatch(setAccountNumbers({ accountNumbers : [1111] }));
  }
}

export function setAccountNumbers({ accountNumbers }) {
  return {
    type: types.SET_ACCOUNT_NUMBER,
    accountNumbers,
  };
}
