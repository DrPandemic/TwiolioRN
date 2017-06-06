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
  dateCreated: string;
  dateUpdated: string;
  dateSent: string;
  status: string;
  direction: string;

  constructor(response: any) {
    this.sid = response.sid;
    this.body = response.body;
    this.to = response.to;
    this.from = response.from;
    this.dateCreated = response.date_created;
    this.dateUpdated = response.date_updated;
    this.dateSent = response.date_sent;
    this.status = response.status;
    this.direction = response.direction;
  }

  /*
     According to twilio doc:
     The direction of this SMS message. inbound for incoming messages,
      outbound-api for messages initiated via the REST API,
      outbound-call for messages initiated during a call
      or outbound-reply for messages initiated in response to an incoming SMS
   */
  get conversationUsers(): ConversationUsers {
    return {
      us: this.direction === 'inbound' ? this.to : this.from,
      other: this.direction === 'inbound' ? this.from : this.to
    };
  }

  static getConversationId(conversationUsers: ConversationUsers): string {
    return [conversationUsers.us, conversationUsers.other].join('');
  }

  get conversationId(): string {
    return Message.getConversationId(this.conversationUsers);
  }
}

