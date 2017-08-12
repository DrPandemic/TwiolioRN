import { fetchNumbers } from './phoneNumbers';
import { fetchMessages, sendMessage } from './messages';
import {
  persistStore,
  restoreStore,
  scheduleTick,
} from './persist';

export default {
  fetchNumbers,
  fetchMessages,
  sendMessage,
  persistStore,
  restoreStore,
  scheduleTick,
};
