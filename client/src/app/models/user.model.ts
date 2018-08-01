export class User {

  avatar: string;
  signupDate: Date;
  state: boolean;
  _id: string
  email: string;
  displayName: string;
  providerId: string;
  username: string;

  constructor(
    avatar,
    signupDate,
    state,
    _id,
    email,
    displayName,
    providerId,
    username,
  ) {
    this.avatar = avatar;
    this.signupDate = signupDate;
    this.state = state;
    this._id = _id;
    this.email = email;
    this.displayName = displayName;
    this.providerId = providerId;
    this.username = username;
  }

}