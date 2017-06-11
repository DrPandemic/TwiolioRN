import { push } from 'react-router-redux';

import * as fetchedAccountNumbersActions from './fetchedAccountNumbers';
import * as accountActions from './account';
import * as messageActions from './messages';

export const ActionCreators = Object.assign(
  { push },
  fetchedAccountNumbersActions,
  accountActions,
  messageActions,
);
