export class Client {

  constructor(id?: number, name?: string, lastName?:string ,address?: string, email?: string, phoneNumber?: string) {
    this.id = id;
    this.name = name;
    this.lastName = name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }

  public id?: number;
  public name?: string;
  public lastName?: string;
  public address?: string;
  public phoneNumber?: string;
  public email?: string;
  public index?: number;
}
