class Config{

};
const ip= "localhost:"

class DevConfig{
    public loginUrl = "http://"+ip+"8080/auth/login";
    public getAllCompaniesUrl = "http://"+ip+"8080/api/admin/getAllCompanies";
    public getCompanyUrl = "http://"+ip+"8080/api/admin/getCompany?companyID=";
    public getCustomerUrl = "http://"+ip+"8080/api/admin/getCustomer?customerID=";
    public getAllCustomersUrl = "http://"+ip+"8080/api/admin/getAllCustomers";
    public addCompanyUrl = "http://"+ip+"8080/api/admin/addCompany";
    public addCustomerUrl = "http://"+ip+"8080/api/admin/addCustomer";
    public updateCustomerUrl = "http://"+ip+"8080/api/admin/updateCustomer";
    public updateCompanyUrl = "http://"+ip+"8080/api/admin/updateCompany";
    public deleteCustomerUrl = "http://"+ip+"8080/api/admin/deleteCustomer?customerID=";
    public deleteCompanyUrl = "http://"+ip+"8080/api/admin/deleteCompany?companyID=";
    public addCouponUrl = "http://"+ip+"8080/api/company/addCoupon";
    public updateCouponUrl = "http://"+ip+"8080/api/company/updateCoupon";
    public deleteCouponUrl = "http://"+ip+"8080/api/company/deleteCoupon?couponID=";
    public companyCouponsUrl = "http://"+ip+"8080/api/company/companyCoupons";
    public companyCouponsByCategoryUrl = "http://"+ip+"8080/api/company/companyCouponsByCategory?category=";
    public companyCouponsByMaxPriceUrl = "http://"+ip+"8080/api/company/companyCouponsByMaxPrice?maxPrice=";
    public companyUrl = "http://"+ip+"8080/api/company/company";
    public purchaseUrl = "http://"+ip+"8080/api/customer/purchase?couponID=";
    public customerUrl = "http://"+ip+"8080/api/customer/Customer";
    public customerCouponsUrl = "http://"+ip+"8080/api/customer/CustomerCoupons";
    public customerCouponsMaxPriceUrl = "http://"+ip+"8080/api/customer/CustomerCouponsByMaxPrice?maxPrice=";
    public customerCouponsCategoryUrl = "http://"+ip+"8080/api/customer/CustomerCouponsByCategory?category=";
    public getCouponUrl = "http://"+ip+"8080/api/company/coupon?couponId=";
    public getAllCouponsUrl = "http://"+ip+"8080/api/customer/AllCoupons";
    public AddImageUrl = "http://"+ip+"8080/addImage/";

};

class ProductionConfig{
    public loginUrl = "http://couponSystem.com/auth/login";
    public getAllCompaniesUrl = "http://couponSystem.com/api/admin/getAllCompanies";
    public getCompanyUrl = "http://couponSystem.com/api/admin/getCompany?companyID=";
    public getCustomerUrl = "http://couponSystem.com/api/admin/getCustomer?customerID=";
    public getAllCustomersUrl = "http://couponSystem.com/api/admin/getAllCustomers";
    public addCompanyUrl = "http://couponSystem.com/api/admin/addCompany";
    public addCustomerUrl = "http://couponSystem.com/api/admin/addCustomer";
    public addCouponUrl = "http://couponSystem.com/api/company/addCoupon";
    public updateCustomerUrl = "http://couponSystem.com/api/admin/updateCustomer";
    public updateCompanyUrl = "http://couponSystem.com/api/admin/updateCompany";
    public deleteCustomerUrl = "http://couponSystem.com/api/admin/deleteCustomer?customerID=";
    public deleteCompanyUrl = "http://couponSystem.com/api/admin/deleteCompany?companyID=";
    public updateCouponUrl = "http://couponSystem.com/api/company/updateCoupon";
    public deleteCouponUrl = "http://couponSystem.com/api/company/deleteCoupon?couponID=";
    public companyCouponsUrl = "http://couponSystem.com/api/company/companyCoupons";
    public companyCouponsByCategoryUrl = "http://localhost:8080/api/company/companyCouponsByCategory?category=";
    public companyCouponsByMaxPriceUrl = "http://localhost:8080/api/company/companyCouponsByMaxPrice?maxPrice=";
    public companyUrl = "http://couponSystem.com/api/company/company";
    public purchaseUrl = "http://couponSystem.com/api/customer/purchase?couponID=";
    public customerUrl = "http://couponSystem.com/api/customer/Customer";
    public customerCouponsUrl = "http://couponSystem.com/api/customer/CustomerCoupons";
    public customerCouponsMaxPriceUrl = "http://couponSystem.com/api/customer/CustomerCouponsByMaxPrice?maxPrice=";
    public customerCouponsCategoryUrl = "http://couponSystem.com/api/customer/CustomerCouponsByCategory?category=";
    public getCouponUrl = "http://couponSystem.com/api/company/coupon?couponId=";
    public getAllCouponsUrl = "http://couponSystem.com/api/customer/AllCoupons";
    public AddImageUrl = "http://couponSystem.com/addImage/";



};

const appConfig = process.env.NODE_ENV === "development"
? new DevConfig():new ProductionConfig();
export default appConfig;