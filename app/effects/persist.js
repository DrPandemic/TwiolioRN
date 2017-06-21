// @flow

import { persistStore as pS } from 'redux-persist';
import FilesystemStorage from 'redux-persist-filesystem-storage';

import { store } from '../store';

export default function persistStore(): void {
  pS(
    store,
    {
      storage: FilesystemStorage,
    }
  );
}
