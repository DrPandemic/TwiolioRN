// @flow

import { persistStore as pS } from 'redux-persist';
import { store } from '../components/AppContainer';

export default function persistStore(): void {
  pS(store);
}
