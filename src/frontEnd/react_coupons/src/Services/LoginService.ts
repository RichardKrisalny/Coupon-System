import axios from "axios";
import UserCredentialsModel, { Role } from "../Models/UserCredentialsModel";
import appConfig from "../Utils/Config";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthActionType, AuthStore } from "../Redux/AuthState";
import {
  AdminActionType,
  AdminState,
  AdminStore,
  GetAllCompaniesAction,
  GetAllCustomersAction,
} from "../Redux/AdminState";
import {
  CustomerCouponsStore,
  GetAllCustomersCouponsAction,
} from "../Redux/CustomerState";
import {
  CompanyCouponsStore,
  GetAllCouponsAction,
} from "../Redux/CompanyState";

class LoginService {
  public async logout() {
    AuthStore.dispatch({ type: AuthActionType.Logout });
  }

  public async login(userCredentials: UserCredentialsModel): Promise<void> {
    const response = await axios.post<string>(
      appConfig.loginUrl,
      userCredentials
    );
    const jwt = response.data;
    AuthStore.dispatch({ type: AuthActionType.Login, payload: jwt });
  }
}
const loginService = new LoginService();
export default loginService;
