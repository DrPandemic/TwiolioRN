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

export const SET_FETCHED_ACCOUNT_NUMBERS = 'SET_FETCHED_ACCOUNT_NUMBERS';
export const FETCH_ACCOUNT_NUMBERS = 'FETCH_ACCOUNT_NUMBERS';
export const FETCH_ACCOUNT_NUMBER_ERROR = 'FETCH_ACCOUNT_NUMBER_ERROR';

export const SELECT_NUMBER = 'SELECT_NUMBER';
