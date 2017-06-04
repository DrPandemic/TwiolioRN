// @flow

import * as types from './types';

export function selectNumber(selectedNumberSid: ?string) {
  return {
    type: types.SELECT_NUMBER,
    selectedNumber: selectedNumberSid,
  };
}
