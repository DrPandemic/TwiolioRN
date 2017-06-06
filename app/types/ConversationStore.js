// @flow

import { Message } from './';
import type { ConversationUsers } from './Message';
import match from '../lib/match';

export type ConversationStoreT = {
  [conversationId: string]: Array<Message>
};

export function addMessage(store: ConversationStoreT, message: Message):
ConversationStoreT {
  const id = message.conversationId;

  return {
    ...store,
    [id]: [message, ...(store[id] || []).filter(m => m.sid !== message.sid)]
  };
}

export function addMessages(
  store: ConversationStoreT,
  messages: Array<Message>
): ConversationStoreT {
  return messages.reduce((s, m) => addMessage(s, m), store);
}

export function getMessages(
  store: ConversationStoreT,
  conversationUsers: ConversationUsers
): Array<Message> {
  return store[Message.getConversationId(conversationUsers)];
}
