// @flow

import { Message } from './';
import type { ConversationUsers } from './Message';

type Entries = {
  [conversationId: string]: Array<Message>
};

export default class ConversationStore {
  entries: Entries;

  constructor() {
    this.entries = {};
  }

  addMessage(message: Message): void {
    let entry: ?Array<Message>;
    if ((entry = this.entries[message.getConversationId()]) !== undefined) {
      // This number was already used
      if (!entry.some(m => m.sid === message.sid)) {
        // New message
        entry.push(message);
      }
    } else {
      // New number
      this.entries[message.getConversationId()] = [message];
    }
  }

  addMessages(messages: Array<Message>): void {
    for (const message of messages) {
      this.addMessage(message);
    }
  }

  getMessages(conversationUsers: ConversationUsers): Array<Message> {
    return this.entries[Message.getConversationId(conversationUsers)];
  }
}
