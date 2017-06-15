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

  // This could be an performance issue at some point
  return {
    ...store,
    [id]: [message, ...(store[id] || []).filter(m => m.sid !== message.sid)]
      .sort((a: Message, b: Message) => a.compare(b))
  };
}

export function addMessages(
  store: ConversationStoreT,
  messages: Array<Message>
): ConversationStoreT {
  return messages.reduce((s, m) => addMessage(s, m), store);
}

export function getMessagesById(
  store: ConversationStoreT,
  conversationId: string
): Array<Message> {
  return store[conversationId] || [];
}

export function getMessages(
  store: ConversationStoreT,
  conversationUsers: ConversationUsers
): Array<Message> {
  return getMessagesById(store, Message.getConversationId(conversationUsers));
}

export function getConversations(
  store: ConversationStoreT
): NestedArray<Message> {
  return Object.values(store)
    .sort((aList: Array<Message>, bList: Array<Message>) => {
      const a = aList[aList.length - 1];
      const b = bList[bList.length - 1];

      if (a.dateSent < b.dateSent) {
        return -1;
      } else if (a.dateSent > b.dateSent) {
        return 1;
      }
      return 0;
    });
}

// For this function to work, we need to have non-empty conversations.
export function filterByUs(
  store: ConversationStoreT,
  us: ?string
): ConversationStoreT {
  if (us === null) {
    return { ...store };
  }

  return Object.entries(store)
               .filter(
                 ([k, [v]]: [string, Array<Message>]) =>
                   v.conversationUsers.us === us)
               .reduce(
                 (acc, [k: string, v: Array<Message>]) => ({ ...acc, [k]: v }),
                 {}
               );
}
