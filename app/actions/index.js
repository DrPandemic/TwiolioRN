import * as fetchedAccountNumbersActions from './fetchedAccountNumbers';
import * as accountActions from './account';

export const ActionCreators = Object.assign(
  {},
  fetchedAccountNumbersActions,
  accountActions,
);
