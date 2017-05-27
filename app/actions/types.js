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

export type Dispatch = (action: Action) => void;
export type ActionCreator = (Dispatch) => Promise<Action>;

export type Action = {
  type: 'SET_ACCOUNT_NUMBERS',
  accountNumbers: Array<PhoneNumber>,
};

export const SET_ACCOUNT_NUMBERS = 'SET_ACCOUNT_NUMBERS';
