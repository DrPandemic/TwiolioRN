// @flow

export type ConversationUsers = {|
  us: string,
  other: string
|};

export default class Message {
  sid: string;
  body: string;
  to: string;
  from: string;
  dateCreated: ?Date;
  dateUpdated: ?Date;
  dateSent: ?Date;
  status: string;
  direction: string;
  empty: boolean;

  constructor(response: any) {
    this.sid = response.sid;
    this.body = response.body;
    this.to = response.to;
    this.from = response.from;
    this.dateCreated = response.date_created ? new Date(response.date_created) : null;
    this.dateUpdated = response.date_updated ? new Date(response.date_updated) : null;
    this.dateSent = response.date_sent ? new Date(response.date_sent) : null;
    this.status = response.status;
    this.direction = response.direction;
    this.empty = false;
  }

  static createEmpty(conversationUsers: ConversationUsers) {
    const message = new Message({});
    message.empty = true;
    message.from = conversationUsers.other;
    message.to = conversationUsers.us;
    message.direction = 'inbound';

    return message;
  }

  static restore(data: any): Message {
    const message = new Message(data);
    message.dateCreated = new Date(data.dateCreated);
    message.dateUpdated = new Date(data.dateUpdated);
    message.dateSent = new Date(data.dateSent);

    return message;
  }

  /*
     According to twilio doc:
     The direction of this SMS message. inbound for incoming messages,
      outbound-api for messages initiated via the REST API,
      outbound-call for messages initiated during a call
      or outbound-reply for messages initiated in response to an incoming SMS
   */
  get isInbound(): boolean {
    return this.direction === 'inbound';
  }

  get conversationUsers(): ConversationUsers {
    return {
      us: this.isInbound ? this.to : this.from,
      other: this.isInbound ? this.from : this.to
    };
  }

  static getConversationId(conversationUsers: ConversationUsers): string {
    return [conversationUsers.us, conversationUsers.other].join('');
  }

  get conversationId(): string {
    return Message.getConversationId(this.conversationUsers);
  }

  compare(b: Message): number {
    if (this.dateSent > b.dateSent) {
      return 1;
    } else if (this.dateSent < b.dateSent) {
      return -1;
    // To be sure that 2 different messages are not seen as the same
    } else if (this.sid > b.sid) {
      return 1;
    } else if (this.sid < b.sid) {
      return -1;
    }
    return 0;
  }

  static FindMostRecentDateSent(messages: Array<Message>): ?Date {
    if (messages.length === 0) {
      return null;
    }
    // I would like to have a fold here
    return messages.reduce(
      (prev: Message, curr: Message) =>
        (prev.dateSent > curr.dateSent ? prev : curr),
      messages[0]
    ).dateSent;
  }

  copy(): Message {
    return new Message({
      sid: this.sid,
      body: this.body,
      to: this.to,
      from: this.from,
      date_created: this.dateCreated.getTime(),
      date_updated: this.dateUpdated.getTime(),
      date_sent: this.dateSent.getTime(),
      status: this.status,
      direction: this.direction,
    });
  }
}
