import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CompanyArea/CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";
import { Table } from "react-bootstrap";
import React from "react";
import { CustomerCouponsStore } from "../../../Redux/CustomerState";

interface CustomerHomeProps {
  purchase: boolean;
}

function CustomerHome(props: CustomerHomeProps): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0);
  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
    setMaxPrice(0);
  };
  const handleInputChange = (event: any) => {
    if(event.target.value<0)
    setMaxPrice(0);
    else{
    setMaxPrice(event.target.value);
    setSelectedValue("All");
    }
  };
  const [coupons, setCoupon] = useState<CouponModel[]>([]);
  useEffect(() => {
    if (!props.purchase) {
      if (
        (selectedValue === "All" || selectedValue === null) &&
        maxPrice == 0
      ) {
        customerService
          .getAllCustomerCoupons()
          .then((c) => {
            setCoupon(c);
          })
          .catch((err) => notificationService.error(err));
      } else {
        if (selectedValue != "All" && selectedValue != null) {
          customerService
            .getAllCouponsByCategory(selectedValue)
            .then((c) => {
              setCoupon(c);
            })
            .catch((err) => notificationService.error(err));
        } else if (maxPrice > 0) {
          customerService
            .getAllCouponsMaxPrice(maxPrice)
            .then((c) => {
              setCoupon(c);
            })
            .catch((err) => notificationService.error(err));
        }
      }
    } else {
      customerService
        .getAllCoupons()
        .then((c) => setCoupon(c))
        .catch((err) => notificationService.error(err));
    }

    const unsubscribe = CustomerCouponsStore.subscribe(() => {
      if(!props.purchase)
      setCoupon(CustomerCouponsStore.getState().Coupons);
      else
      setCoupon(CustomerCouponsStore.getState().AllCoupons);
    });
    return unsubscribe;
  }, [props.purchase, selectedValue, maxPrice]);

  return (
    <div className="CustomerHome">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              {" "}
              {!props.purchase && (
                <React.Fragment>
                  <select
                    className="select"
                    name="All"
                    value={selectedValue}
                    onChange={handleChange}
                  >
                    <option value="All">All</option>
                    <option value="SPORT">Sport</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="CAMPING">Camping</option>
                  </select>
                </React.Fragment>
              )}{" "}
              {props.purchase && <React.Fragment> Category</React.Fragment>}
            </th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Amount</th>
            <th scope="col">
              {!props.purchase && (
                <React.Fragment>
                  <input
                    type="number"
                    className="maxPrice"
                   
                    min="0"
                    value={maxPrice}
                    onChange={handleInputChange}
                  />
                </React.Fragment>
              )}
              {props.purchase && <React.Fragment> Price</React.Fragment>}
            </th>
            <th scope="col">Image</th>
            {props.purchase && <th scope="col">Purchase</th>}
          </tr>
        </thead>
        <tbody>
          {coupons.map((p) => (
            <CouponCard key={p.id} coupon={p} purchase={props.purchase} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CustomerHome;
