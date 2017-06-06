// @flow

export default class PhoneNumber {
  sid: string;
  friendlyName: string;
  number: string;

  constructor(response: any) {
    this.sid = response.sid;
    this.friendlyName = response.friendly_name;
    this.number = response.phone_number;
  }
}
