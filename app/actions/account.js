// @flow

import * as types from './types';

export function selectNumber(selectedNumberSid: ?string): types.SelectNumberT {
  return {
    type: types.SELECT_NUMBER,
    selectedNumber: selectedNumberSid,
  };
}
