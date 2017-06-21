// @flow

import { persistStore as pS } from 'redux-persist';
import { store } from '../store';

export default function persistStore(): void {
  pS(store);
}
