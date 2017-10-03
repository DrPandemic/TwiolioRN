import { push, goBack, go } from 'react-router-redux';

import * as fetchedAccountNumbersActions from './fetchedAccountNumbers';
import * as accountActions from './account';
import * as messageActions from './messages';
import * as persistActions from './persist';
import * as contactActions from './contacts';

export const ActionCreators = Object.assign(
  { push, goBack, go },
  fetchedAccountNumbersActions,
  accountActions,
  messageActions,
  persistActions,
  contactActions,
);
