// @flow

import { Message } from './';
import type { ConversationUsers } from './Message';
import type { NestedArray } from '../types';

export type ConversationStoreT = {
  [conversationId: string]: Array<Message>
};

// Should never produce an empty conversation.
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

export function getConversations(
  store: ConversationStoreT
): NestedArray<Message> {
  return Object.values(store);
}

// For this function to work, we need to have non-empty conversations.
export function filterByUs(
  store: ConversationStoreT,
  us: string
): ConversationStoreT {
  return Object.entries(store)
               .filter(
                 ([k, [v]]: [string, Array<Message>]) =>
                   v.conversationUsers.us === us)
               .reduce(
                 (acc, [k: string, v: Array<Message>]) => ({ ...acc, [k]: v }),
                 {}
               );
}
