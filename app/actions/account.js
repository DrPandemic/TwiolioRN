// @flow

import * as types from './types';

export function selectNumber(selectedNumber: ?string)
: types.SelectNumberT {
  return {
    type: types.SELECT_NUMBER,
    selectedNumber,
  };
}
