import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CouponModel from "../../../Models/CouponModel";
import { CompanyCouponsStore } from "../../../Redux/CompanyState";
import companyService from "../../../Services/CompanyService";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";

function Coupons(): JSX.Element {
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
    if ((selectedValue === "All" || selectedValue === null) && maxPrice == 0) {
      companyService
        .getAllCoupons()
        .then((coupons) => setCoupon(coupons))
        .catch((err) => notificationService.error(err));
    } else {
      if (selectedValue != "All" && selectedValue != null) {
        companyService
          .getAllCouponsByCategory(selectedValue)
          .then((coupons) => setCoupon(coupons))
          .catch((err) => notificationService.error(err));
      } else if (maxPrice > 0) {
        companyService
          .getAllCouponsMaxPrice(maxPrice)
          .then((coupons) => setCoupon(coupons))
          .catch((err) => notificationService.error(err));
      }
    }

    const unsubscribe = CompanyCouponsStore.subscribe(() => {
      const dup = [...CompanyCouponsStore.getState().Coupons];
      setCoupon(dup);
      return unsubscribe;
    });
  }, [selectedValue, maxPrice]);

  return (
    <div className="Coupons">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              {" "}
              <select
                className="select"
                name="category"
                value={selectedValue}
                onChange={handleChange}
              >
                <option value="All">All</option>
                <option value="SPORT">Sport</option>
                <option value="ELECTRICITY">Electricity</option>
                <option value="CLOTHING">Clothing</option>
                <option value="CAMPING">Camping</option>
              </select>
            </th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Amount</th>
            <th scope="col">
              <input
                type="number"
                className="maxPrice"
                min="0"
                value={maxPrice}
                onChange={handleInputChange}
              />
            </th>
            <th scope="col">Image</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((p) => (
            <CouponCard key={p.id} coupon={p} purchase={false} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Coupons;
