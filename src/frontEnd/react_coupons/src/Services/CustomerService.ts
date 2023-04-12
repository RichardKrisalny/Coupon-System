import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { CompanyCouponsStore } from "../Redux/CompanyState";
import {
  CustomerCouponsStore,
  GetAllCouponsAction,
  GetAllCustomersCouponsAction,
  purchaseCouponAction,
  updateCouponAction,
} from "../Redux/CustomerState";
import appConfig from "../Utils/Config";

class CustomerService {
  public async purchase(id: any): Promise<void> {
    const response = await axios.post<any>(appConfig.purchaseUrl + id);
    CustomerCouponsStore.dispatch(purchaseCouponAction(CustomerCouponsStore.getState().AllCoupons.find(e => e.id===id)));
  }

  public async getCustomer(): Promise<CustomerModel> {
    const response = await axios.get<CustomerModel>(appConfig.customerUrl);
    const customer = response.data;
    return customer;
  }
  public async getAllCustomerCoupons(): Promise<CouponModel[]> {
    if (CustomerCouponsStore.getState().Coupons.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.customerCouponsUrl
      );
      const coupons = response.data;
      CustomerCouponsStore.dispatch(GetAllCustomersCouponsAction(coupons));
      return coupons;
    }
    return CustomerCouponsStore.getState().Coupons;
  }

  public async getAllCoupons(): Promise<CouponModel[]> {
    if (CustomerCouponsStore.getState().AllCoupons.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.getAllCouponsUrl
      );
      const coupons = response.data;
      CustomerCouponsStore.dispatch(GetAllCouponsAction(coupons));
      return coupons;
    }
    return CustomerCouponsStore.getState().AllCoupons;
  }

  public async getAllCouponsMaxPrice(price: number): Promise<CouponModel[]> {
    const response = await axios.get<CouponModel[]>(
      appConfig.customerCouponsMaxPriceUrl + price
    );
    const coupons = response.data;
    return coupons;
  }
  public async getAllCouponsByCategory(
    category: string
  ): Promise<CouponModel[]> {
    const response = await axios.get<CouponModel[]>(
      appConfig.customerCouponsCategoryUrl + category
    );
    const coupons = response.data;
    return coupons;
  }
}
const customerService = new CustomerService();
export default customerService;
