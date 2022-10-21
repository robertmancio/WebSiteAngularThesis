export interface Users {
  UserName: string;
  Email: string;
  Role: string;

}
export class User {

  constructor(id?: string, userName?: string, email?: string, role?: string) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.role = role;
  }

  public id?: string;
  public userName?: string;
  public email?: string;
  public role?: string;
  public index?: number;
}
