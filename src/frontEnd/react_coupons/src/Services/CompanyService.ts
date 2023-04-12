import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import {
  AddCouponsAction,
  CompanyCouponsStore,
  DeleteCouponsAction,
  GetAllCouponsAction,
  UpdateCouponsAction,
} from "../Redux/CompanyState";
import { addCouponAction, CustomerCouponsStore, deleteCouponAction, updateCouponAction } from "../Redux/CustomerState";
import appConfig from "../Utils/Config";

class CompanyService {
  public async addCoupon(coupon: CouponModel): Promise<void> {
    const response = await axios.post<CouponModel>(
      appConfig.addCouponUrl,coupon);
    const addedCoupon = response.data;
    CompanyCouponsStore.dispatch(AddCouponsAction(addedCoupon));
    CustomerCouponsStore.dispatch(addCouponAction(addedCoupon));
  }

  public async updateCoupon(coupon: CouponModel): Promise<void> {
    const response = await axios.put<CouponModel>(
      appConfig.updateCouponUrl,
      coupon
    );
    CompanyCouponsStore.dispatch(UpdateCouponsAction(coupon));
    CustomerCouponsStore.dispatch(updateCouponAction(coupon));
  }

  public async deleteCoupon(id: number): Promise<void> {
    await axios.delete(appConfig.deleteCouponUrl + id);
    CompanyCouponsStore.dispatch(DeleteCouponsAction(id));
    CustomerCouponsStore.dispatch(deleteCouponAction(id));
  }

  public async getCompany(): Promise<CompanyModel> {
    const response = await axios.get<CompanyModel>(appConfig.companyUrl);
    const coupons = response.data;
    return coupons;
  }

  public async getCoupon(id: number): Promise<CouponModel> {
    return CompanyCouponsStore.getState().Coupons.find((p) => p.id === id);
  }

  public async getAllCoupons(): Promise<CouponModel[]> {
    if (CompanyCouponsStore.getState().Coupons.length === 0) {
      const response = await axios.get<CouponModel[]>(
        appConfig.companyCouponsUrl
      );
      const coupons = response.data;
      CompanyCouponsStore.dispatch(GetAllCouponsAction(coupons));
      return coupons;
    }
    return CompanyCouponsStore.getState().Coupons;
  }

  public async getAllCouponsMaxPrice(price: number): Promise<CouponModel[]> {
    const response = await axios.get<CouponModel[]>(
      appConfig.companyCouponsByMaxPriceUrl + price
    );
    const coupons = response.data;
    return coupons;
  }

  public async getAllCouponsByCategory(
    category: string
  ): Promise<CouponModel[]> {
    const response = await axios.get<CouponModel[]>(
      appConfig.companyCouponsByCategoryUrl + category
    );
    const coupons = response.data;
    return coupons;
  }
}
const companyService = new CompanyService();
export default companyService;
