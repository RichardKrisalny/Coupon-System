import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { Role } from "../../../Models/UserCredentialsModel";
import { AuthStore } from "../../../Redux/AuthState";
import companyService from "../../../Services/CompanyService";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";

interface CouponCardProps {
  coupon: CouponModel;
  purchase: boolean;
}
function CouponCard(props: CouponCardProps): JSX.Element {
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>();
  useEffect(() => {
    setRole(AuthStore.getState().user.clientType);
    const unsubscribe = AuthStore.subscribe(() => {
      if (AuthStore.getState().user != null)
        setRole(AuthStore.getState().user.clientType);
    });
    return unsubscribe;
  }, []);

  function checkRole(): boolean {
    return role && role.toString() == "COMPANY" && true;
  }

  async function deleteCoupon() {
    if (window.confirm("Are you sure?")) {
      try {
        await companyService.deleteCoupon(props.coupon.id);
        notificationService.success("Coupon Deleted");
      } catch (error: any) {
        notificationService.error(error);
      }
    }
  }
  async function purchaseCoupon() {
    if (window.confirm("Are you sure?")) {
      try {
        await customerService.purchase(props.coupon.id);
        notificationService.success("Coupon Purchased");
        navigate("/customer/coupons");
      } catch (error: any) {
        notificationService.error(error);
       
      }
    }
  }
  return (
    <tr>
      <td>{props.coupon.category} </td>
      <td>{props.coupon.title} </td>
      <td>{props.coupon.description} </td>
      <td>{props.coupon.startDate.toString()} </td>
      <td>{props.coupon.endDate.toString()} </td>
      <td>{props.coupon.amount} </td>
      <td>{props.coupon.price} </td>
      <td> <NavLink className={"a"}
              to={"/couponImage/" + props.coupon.image}>
              🖼️ 
            </NavLink>{" "}</td>
      {/* <td>{props.coupon.image} </td> */}
      {checkRole() && (
        <React.Fragment>
          <td>
            <NavLink
              className={"a"}
              to={"/company/updateCoupon/" + props.coupon.id}
            >
              ⬆️
            </NavLink>{" "}
          </td>
          <td>
            {" "}
            <NavLink className={"a"} to="" onClick={deleteCoupon}>
              ❌
            </NavLink>{" "}
          </td>
        </React.Fragment>
      )}
      {props.purchase && (
        <td>
          {" "}
          <NavLink className={"a"} to="" onClick={purchaseCoupon}>
            💲
          </NavLink>{" "}
        </td>
      )}
    </tr>
    
  );
}
export default CouponCard;
