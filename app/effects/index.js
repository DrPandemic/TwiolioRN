import { fetchNumbers } from './phoneNumbers';
import { fetchMessages } from './messages';
import {
  persistStore,
  restoreStore,
  scheduleTick,
} from './persist';

export default {
  fetchNumbers,
  fetchMessages,
  persistStore,
  restoreStore,
  scheduleTick,
};
