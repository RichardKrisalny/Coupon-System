import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserCredentialsModel from "../Models/UserCredentialsModel";
import notificationService from "../Services/NotificationService";
import {
  AdminStore,
  GetAllCompaniesAction,
  GetAllCustomersAction,
} from "./AdminState";
import { CompanyCouponsStore, GetAllCouponsAction } from "./CompanyState";
import {
  CustomerCouponsStore,
  GetAllCustomersCouponsAction,
} from "./CustomerState";

export class AuthState {
  public user: UserCredentialsModel = null;
  public token: string = null;

  public constructor() {
    this.token = sessionStorage.getItem("jwt");
    if (this.token) {
      this.user = extractUser(this.token);
    }
  }
}

export enum AuthActionType {
  Login,
  Logout,
}

export interface AuthAction {
  type: AuthActionType;
  payload?: string;
}

export function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Login:
      newState.token = action.payload;
      newState.user = extractUser(newState.token);
      sessionStorage.setItem("jwt", newState.token);
      break;
    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      sessionStorage.removeItem("jwt");
      AdminStore.dispatch(GetAllCompaniesAction([]));
      AdminStore.dispatch(GetAllCustomersAction([]));
      CustomerCouponsStore.dispatch(GetAllCustomersCouponsAction([]));
      CompanyCouponsStore.dispatch(GetAllCouponsAction([]));
      notificationService.success("Logged Out");
      break;
  }

  return newState;
}

function extractUser(token: string): UserCredentialsModel {
  let user: UserCredentialsModel;
  const container: any = jwtDecode(token);
  user = JSON.parse(container.user);
  return user;
}

export const AuthStore = createStore(authReducer);
