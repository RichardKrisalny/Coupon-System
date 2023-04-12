import { Route, Routes } from "react-router-dom";
import Header from "../../LayoutArea/Header/Header";

function HeaderRouting(): JSX.Element {
  return (
    <Routes>
      <Route path="admin" element={<Header title={"Companies"} />} />
      <Route path="admin/companies" element={<Header title={"Companies"} />} />
      <Route path="admin/customers" element={<Header title={"Customers"} />} />
      <Route
        path="admin/addcompany"
        element={<Header title={"Add Company"} />}
      />
      <Route
        path="admin/Addcustomer"
        element={<Header title={"Add Customer"} />}
      />
      <Route
        path="admin/updatecompany/*"
        element={<Header title={"Update Company"} />}
      />
      <Route
        path="admin/updatecustomer/*"
        element={<Header title={"Update Customer"} />}
      />
      <Route path="/company/coupons" element={<Header title={"Coupons"} />} />
      <Route path="/company" element={<Header title={"Coupons"} />} />
      <Route path="/customer/coupons" element={<Header title={"Coupons"} />} />
      <Route path="/customer" element={<Header title={"Coupons"} />} />
      <Route
        path="/company/addCoupon"
        element={<Header title={"Add Coupon"} />}
      />
      <Route
        path="/company/updateCoupon/*"
        element={<Header title={"Update Coupon"} />}
      />
      <Route
        path="/customer/couponsToPurchase"
        element={<Header title={"Purchase Coupon"} />}
      />
            <Route path="/couponImage/:couponId" element={<Header title={"Coupon Image"} />} />
    </Routes>
  );
}

export default HeaderRouting;
