// @flow

export type Email = {|
  label: string,
  email: string
|};

export type ContactPhoneNumber = {|
  label: string,
  email: string
|};

export type PostalAddress = {|
  postCode: string,
  city: string,
  neighborhood: string,
  street: string,
  formattedAddress: string,
  label: string
|};

export default class Contact {
  recordID: string;
  company: string;
  emailAddresses: Array<Email>;
  familyName: string;
  givenName: string;
  jobTitle: string;
  middleName: string;
  phoneNumbers: Array<ContactPhoneNumber>;
  hasThumbnail: boolean;
  thumbnailPath: string;
  postalAddresses: Array<PostalAddress>;

  constructor(response: any) {
    this.recordID = response.recordID;
    this.company = response.company;
    this.emailAddresses = response.emailAddresses;
    this.familyName = response.familyName;
    this.givenName = response.givenName;
    this.jobTitle = response.jobTitle;
    this.middleName = response.middleName;
    this.phoneNumbers = response.phoneNumbers;
    this.hasThumbnail = response.hasThumbnail;
    this.thumbnailPath = response.thumbnailPath;
    this.postalAddresses = response.postalAddresses;
  }
}
