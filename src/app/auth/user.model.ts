export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    return this._token;
  }

  get expirationDate() {
    return this._tokenExpirationDate;
  }

  get isTokenValid() {
    //check token if token is valid
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      console.log('token expired');
      return null;
    }

    console.log('Token valid');
    return this._token;
  }
}
