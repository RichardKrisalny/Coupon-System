import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Role } from "../../../Models/UserCredentialsModel";
import { AuthStore } from "../../../Redux/AuthState";
import loginService from "../../../Services/LoginService";
import "./Menu.css";

function Menu(): JSX.Element {
  const [role, setRole] = useState<Role>();
  useEffect(() => {
    if (AuthStore.getState().user != null)
      setRole(AuthStore.getState().user.clientType);
    const unsubscribe = AuthStore.subscribe(() => {
      if (AuthStore.getState().user != null)
        setRole(AuthStore.getState().user.clientType);
      else setRole(null);
    });
    return unsubscribe;
  }, []);

  function checkAdmin(): boolean {
    return role && role.toString() == "ADMINISTRATOR" && true;
  }
  function logOut() {
    loginService.logout();
  }

  function checkCompany(): boolean {
    return role && role.toString() == "COMPANY" && true;
  }

  function checkCustomer(): boolean {
    return role && role.toString() == "CUSTOMER" && true;
  }

  function checkNull(): boolean {
    return role === null || role === undefined;
  }

  return (
    <div className="Menu">
      {checkNull() && <React.Fragment></React.Fragment>}

      {checkAdmin() && (
        <React.Fragment>
          <NavLink to={"/admin/companies"} className="menuCss">
            Show All Companies
          </NavLink>
          <br />
          <br />
          <br />
          <NavLink to={"/admin/addCompany"} className="menuCss">
            Add Company
          </NavLink>
          <br />
          <br />
          <br />

          <NavLink to={"/admin/customers"} className="menuCss">
            Show All customers
          </NavLink>
          <br />
          <br />
          <br />
          <NavLink to={"/admin/addCustomer"} className="menuCss">
            Add Customer
          </NavLink>
          <br />
          <NavLink className={"logout menuCss"} to={"/login"} onClick={logOut}>
            Log Out
          </NavLink>
          <br />
        </React.Fragment>
      )}
      {checkCompany() && (
        <React.Fragment>
          <NavLink to={"/company/coupons"} className="menuCss">
            Show All coupons
          </NavLink>
          <br />
          <br />
          <br />
          <NavLink to={"/company/addCoupon"} className="menuCss">
            Add Coupon
          </NavLink>
          <br />
          <NavLink className={"logout menuCss"} to={"/login"} onClick={logOut}>
            Log Out
          </NavLink>
          <br />
        </React.Fragment>
      )}
      {checkCustomer() && (
        <React.Fragment>
          <NavLink to={"/customer/coupons"} className="menuCss">
            Show All coupons
          </NavLink>
          <br />
          <br />
          <br />
          <NavLink to={"/customer/couponsToPurchase"} className="menuCss">
            Purchase Coupon
          </NavLink>
          <br />
          <NavLink className={"logout menuCss"} to={"/login"} onClick={logOut}>
            Log Out
          </NavLink>
          <br />
        </React.Fragment>
      )}
    </div>
  );
}

export default Menu;
