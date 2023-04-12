import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";
export class CustomerCouponsState {
  public Coupons?: CouponModel[] = [];
  public AllCoupons?: CouponModel[] = [];
}

export enum CouponsActionType {
  GetCustomerCoupons,
  getAllCoupons,
  addCoupon,
  purchaseCoupon,
  deleteCoupon,
  updateCoupon
}
export interface CouponsAction {
  type: CouponsActionType;
  payload?: any;
}

export function GetAllCustomersCouponsAction(
  Coupons: CouponModel[]
): CouponsAction {
  return { type: CouponsActionType.GetCustomerCoupons, payload: Coupons };
}
export function GetAllCouponsAction(Coupons: CouponModel[]): CouponsAction {
  return { type: CouponsActionType.getAllCoupons, payload: Coupons };
}
export function addCouponAction(Coupons: CouponModel): CouponsAction {
  return { type: CouponsActionType.addCoupon, payload: Coupons };
}
export function purchaseCouponAction(Coupons: CouponModel): CouponsAction {
  return { type: CouponsActionType.purchaseCoupon, payload: Coupons };
}
export function deleteCouponAction(id: number): CouponsAction {
  return { type: CouponsActionType.deleteCoupon, payload: id };
}
export function updateCouponAction(Coupons: CouponModel): CouponsAction {
  return { type: CouponsActionType.updateCoupon, payload: Coupons };
}

export function CouponsReducer(
  currentState: CustomerCouponsState = new CustomerCouponsState(),
  action: CouponsAction
): CustomerCouponsState {
  const newState = { ...currentState };
  switch (action.type) {
    case CouponsActionType.GetCustomerCoupons:
      newState.Coupons = action.payload;
      break;
    case CouponsActionType.getAllCoupons:
      newState.AllCoupons = action.payload;
      break;
    case CouponsActionType.addCoupon:
      newState.AllCoupons.push(action.payload);
      break;
    case CouponsActionType.purchaseCoupon:
      newState.Coupons.push(action.payload);
      const i = newState.AllCoupons.findIndex(
        (c) => c.id === action.payload.id
      );
      if (i >= 0) newState.AllCoupons[i].amount--; 
      break;

      case CouponsActionType.updateCoupon:
        const indexToUpdate = newState.AllCoupons.findIndex(
          (c) => c.id === action.payload.id
        );
        if (indexToUpdate >= 0) newState.AllCoupons[indexToUpdate] = action.payload;        
        break;
      case CouponsActionType.deleteCoupon:
        const indexToDelete = newState.AllCoupons.findIndex(
          (c) => c.id === action.payload
        );
        if (indexToDelete >= 0) newState.AllCoupons.splice(indexToDelete, 1);
        break;
  }
  return newState;
}
export const CustomerCouponsStore = createStore(CouponsReducer);
