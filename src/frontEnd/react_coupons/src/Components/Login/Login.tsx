
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserCredentialsModel from "../../Models/UserCredentialsModel";
import loginService from "../../Services/LoginService";
import notificationService from "../../Services/NotificationService";
import "./Login.css";
import { AuthActionType, AuthStore } from "../../Redux/AuthState";
import { useEffect } from "react";
function Login(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserCredentialsModel>();
  const navigate = useNavigate();
  useEffect(() => {
    if(AuthStore.getState().user!=null)
    AuthStore.dispatch({ type: AuthActionType.Logout });
  }, []);
  async function login(userCredentials: UserCredentialsModel) {
    try {
      await loginService.login(userCredentials);
      notificationService.success("Logged in");
      if (userCredentials.clientType.toString() == "ADMINISTRATOR")
        navigate("/admin/companies");
      if (userCredentials.clientType.toString() == "COMPANY")
        navigate("/company/coupons");
      if (userCredentials.clientType.toString() == "CUSTOMER")
        navigate("/customer/coupons");
    } catch (error: any) {
      notificationService.error(error);
    }
  }
  return (
    <div className="login-box">
      <h2>𝐋𝐨𝐠𝐢𝐧</h2>
      <form>
        <div className="user-box">
          <input
            type="text"
            {...register("email", {
              required: { value: true, message: "Missing name" },
            })}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "Missing password" },
            })}
          />
          <label>Password</label>
        </div>

        <div className="container">
          <label className="radio-button">
            <input
              type="radio"
              name="radio"
              value="COMPANY"
              {...register("clientType", { required: true })}
            />
            <span className="label-visible">
              <span className="fake-radiobutton"></span>
              Company
            </span>
          </label>
          <label className="radio-button">
            <input
              type="radio"
              name="radio"
              value="CUSTOMER"
              {...register("clientType", { required: true })}
            />
            <span className="label-visible">
              <span className="fake-radiobutton"></span>
              Customer
            </span>
          </label>
          <label className="radio-button">
            <input
              type="radio"
              name="radio"
              value="ADMINISTRATOR"
              {...register("clientType", { required: true })}
            />
            <span className="label-visible">
              <span className="fake-radiobutton"></span>
              Admin
            </span>
          </label>
        </div>
        <a href="" onClick={handleSubmit(login)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </a>
      </form>
    </div>
  );
}

export default Login;
