import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CompanyCouponsState {
  public Coupons: CouponModel[] = [];
}

export enum CouponsActionType {
  GetAllCoupons,
  AddCoupon,
  UpdateCoupon,
  DeleteCoupon,
}

export interface CouponsAction {
  type: CouponsActionType;
  payload?: any;
}

export function GetAllCouponsAction(Coupons: CouponModel[]): CouponsAction {
  return { type: CouponsActionType.GetAllCoupons, payload: Coupons };
}
export function AddCouponsAction(Coupons: CouponModel): CouponsAction {
  return { type: CouponsActionType.AddCoupon, payload: Coupons };
}
export function UpdateCouponsAction(Coupons: CouponModel): CouponsAction {
  return { type: CouponsActionType.UpdateCoupon, payload: Coupons };
}
export function DeleteCouponsAction(id: number): CouponsAction {
  return { type: CouponsActionType.DeleteCoupon, payload: id };
}

export function CouponsReducer(
  currentState: CompanyCouponsState = new CompanyCouponsState(),
  action: CouponsAction
): CompanyCouponsState {
  const newState = { ...currentState };
  switch (action.type) {
    case CouponsActionType.GetAllCoupons:
      newState.Coupons = action.payload;
      break;
    case CouponsActionType.AddCoupon:
      newState.Coupons.push(action.payload);
      break;
    case CouponsActionType.UpdateCoupon:
      const indexToUpdate = newState.Coupons.findIndex(
        (c) => c.id === action.payload.id
      );
      if (indexToUpdate >= 0) newState.Coupons[indexToUpdate] = action.payload;
      break;
    case CouponsActionType.DeleteCoupon:
      const indexToDelete = newState.Coupons.findIndex(
        (c) => c.id === action.payload
      );
      if (indexToDelete >= 0) newState.Coupons.splice(indexToDelete, 1);
      break;
  }
  return newState;
}
export const CompanyCouponsStore = createStore(CouponsReducer);
