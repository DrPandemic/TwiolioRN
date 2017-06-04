// @flow

// Account
export class PhoneNumber {
  sid: string;
  friendlyName: string;
  number: string;

  constructor(response: any) {
    this.sid = response.sid;
    this.friendlyName = response.friendly_name;
    this.number = response.phone_number;
  }
}

export class Message {
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

export const SET_FETCHED_ACCOUNT_NUMBERS = 'SET_FETCHED_ACCOUNT_NUMBERS';
export const FETCH_ACCOUNT_NUMBERS = 'FETCH_ACCOUNT_NUMBERS';
export const FETCH_ACCOUNT_NUMBER_ERROR = 'FETCH_ACCOUNT_NUMBER_ERROR';

export const SELECT_NUMBER = 'SELECT_NUMBER';

export const FETCH_MESSAGES = 'SET_MESSAGES';
export const SET_FETCHED_MESSAGES = 'SET_FETCHED_MESSAGES';
export const FETCH_MESSAGE_ERROR = 'SET_MESSAGE_ERROR';
