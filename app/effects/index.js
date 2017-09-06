import { fetchNumbers } from './phoneNumbers';
import { fetchMessages, sendMessage } from './messages';
import {
  persistStore,
  restoreStore,
  scheduleTick,
} from './persist';
import { fetchContacts } from './contacts';

export default {
  fetchNumbers,
  fetchMessages,
  sendMessage,
  persistStore,
  restoreStore,
  scheduleTick,
  fetchContacts,
};
