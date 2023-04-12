import { Route, Routes } from "react-router-dom";
import Login from "../../Login/Login";
import PageNotFound from "../../PageNotFound/PageNotFound";
import CustomerHome from "../../CustomerArea/CustomerHome/CustomerHome";
import AdminCompaniesHome from "../../AdminArea/Companies/AdminCompaniesHome";
import AdminCustomersHome from "../../AdminArea/Customers/AdminCustomersHome";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import EditCompany from "../../AdminArea/EditCompany/EditCompany";
import Coupons from "../../CompanyArea/Coupons/Coupons";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import EditCoupon from "../../CompanyArea/EditCoupon/EditCoupon";
import EditCustomer from "../../AdminArea/EditCustomer/EditCustomer";
import CouponImage from "../../CompanyArea/CouponImage/CouponImage";
function HomeRouting(): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/company/coupons" element={<Coupons />} />
      <Route path="/company/addCoupon" element={<AddCoupon />} />
      <Route path="/admin/companies" element={<AdminCompaniesHome />} />
      <Route path="/admin/customers" element={<AdminCustomersHome />} />
      <Route path="/admin/addCustomer" element={<AddCustomer />} />
      <Route path="/admin/addCompany" element={<AddCompany />} />
      <Route path="/admin/updateCompany/:companyId" element={<EditCompany />} />
      <Route path="/couponImage/:couponId" element={<CouponImage />} />
      <Route
        path="/admin/updateCustomer/:customerId"
        element={<EditCustomer />}
      />
      <Route path="/company/updateCoupon/:couponId" element={<EditCoupon />} />
      <Route
        path="/customer/couponsToPurchase"
        element={<CustomerHome purchase={true} />}
      />
      <Route
        path="/customer/coupons"
        element={<CustomerHome purchase={false} />}
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default HomeRouting;
