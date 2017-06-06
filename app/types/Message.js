// @flow

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
}

