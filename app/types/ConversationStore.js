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
    [id]: [message, ...(store[id] || [])
      .filter(m => m.sid !== message.sid && !message.empty)]
      .sort((a: Message, b: Message) => a.compare(b))
  };
}

export function addEmptyConversation(
  store: ConversationStoreT,
  conversationUsers: ConversationUsers
): ConversationStoreT {
  const message = Message.createEmpty(conversationUsers);
  const key = Message.getConversationId(conversationUsers);
  return {
    ...store,
    [key]: store[key] || [message],
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
  return (store[conversationId] || [])
    .filter(m => !m.empty);
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
      const cmp = a.compare(b);

      return cmp * -1;
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

// Called when restoring the state.
// The input is like a store but without classes.
export function restore(conversations: { [string]: Array<any> }): ConversationStoreT {
  try {
    let store = {};
    for (const messages: Array<any> of Object.values(conversations)) {
      store = addMessages(store, messages.map(m => Message.restore(m)));
    }
    return store;
  } catch (e) {
    // I don't know what to do with this empty block.
    // I think it's acceptable to ignore the error here.
  }
  return {};
}
