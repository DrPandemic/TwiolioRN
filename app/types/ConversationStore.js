// @flow

import { Message, PhoneNumber } from './';

type Entry = Array<Message>;

type Entries = {
  [conversationId: string]: Entry
};

export default class ConversationStore {
  entries: Entries;

  constructor() {
  }

  addMessage(message: Message) {
    let entry: ?Entry;
    if (entry = this.entries[message.sid]) {
      // This number was already used
    } else {
      // New number
      this.entries[message.fr];
    }
  }

  addMessages(messages: Array<Message>) {
    for (const message of messages) {
      this.addMessage(message);
    }
  }
}
