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
  dateCreated: Date;
  dateUpdated: Date;
  dateSent: Date;
  status: string;
  direction: string;

  constructor(response: any) {
    this.sid = response.sid;
    this.body = response.body;
    this.to = response.to;
    this.from = response.from;
    this.dateCreated = new Date(response.date_created);
    this.dateUpdated = new Date(response.date_updated);
    this.dateSent = new Date(response.date_sent);
    this.status = response.status;
    this.direction = response.direction;
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
    // To be sure that 2 different messages are not seem as the same
    } else if (this.sid > b.sid) {
      return 1;
    } else if (this.sid < b.sid) {
      return -1;
    }
    return 0;
  }
}

