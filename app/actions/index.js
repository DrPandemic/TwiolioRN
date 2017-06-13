import { push, goBack } from 'react-router-redux';

import * as fetchedAccountNumbersActions from './fetchedAccountNumbers';
import * as accountActions from './account';
import * as messageActions from './messages';

export const ActionCreators = Object.assign(
  { push, goBack },
  fetchedAccountNumbersActions,
  accountActions,
  messageActions,
);
