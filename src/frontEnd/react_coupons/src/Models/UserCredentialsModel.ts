class UserCredentialsModel {
  public clientType: Role;
  public email: string;
  public name:string;
  public password?: string;
}
export enum Role {
  ADMINISTRATOR,
  COMPANY,
  CUSTOMER
}
export default UserCredentialsModel;
