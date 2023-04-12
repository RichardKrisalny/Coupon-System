import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";

export class AdminState {
  public companies: CompanyModel[] = [];
  public customers: CustomerModel[] = [];
}
export enum AdminActionType {
  GetAllCustomers,
  AddCustomer,
  UpdateCustomer,
  DeleteCustomer,
  GetAllCompanies,
  AddCompany,
  UpdateCompany,
  DeleteCompany,
}

export interface AdminAction {
  type: AdminActionType; //action type
  payload?: any; //data of action
}

export function GetAllCustomersAction(customers: CustomerModel[]): AdminAction {
  return { type: AdminActionType.GetAllCustomers, payload: customers };
}
export function AddCustomerAction(customer: CustomerModel): AdminAction {
  return { type: AdminActionType.AddCustomer, payload: customer };
}
export function UpdateCustomerAction(customer: CustomerModel): AdminAction {
  return { type: AdminActionType.UpdateCustomer, payload: customer };
}
export function DeleteCustomerAction(id: number): AdminAction {
  return { type: AdminActionType.DeleteCustomer, payload: id };
}
export function GetAllCompaniesAction(companies: CompanyModel[]): AdminAction {
  return { type: AdminActionType.GetAllCompanies, payload: companies };
}
export function AddCompaniesAction(companies: CompanyModel): AdminAction {
  return { type: AdminActionType.AddCompany, payload: companies };
}
export function UpdateCompaniesAction(companies: CompanyModel): AdminAction {
  return { type: AdminActionType.UpdateCompany, payload: companies };
}
export function DeleteCompanyAction(id: number): AdminAction {
  return { type: AdminActionType.DeleteCompany, payload: id };
}

export function AdminReducer(
  currentState: AdminState = new AdminState(),
  action: AdminAction
): AdminState {
  const newState = { ...currentState }; // duplicate
  switch (action.type) {
    case AdminActionType.GetAllCompanies:
      newState.companies = action.payload;
      break;
    case AdminActionType.AddCompany:
      newState.companies.push(action.payload);
      break;
    case AdminActionType.UpdateCompany:
      const indexToUpdate = newState.companies.findIndex(
        (c) => c.id === action.payload.id
      );
      if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
      break;
    case AdminActionType.DeleteCompany:
      const indexToDelete = newState.companies.findIndex(
        (c) => c.id === action.payload
      );
      if (indexToDelete >= 0) {
        console.log("been here");
        newState.companies.splice(indexToDelete, 1);
      }
      break;
    case AdminActionType.GetAllCustomers:
      newState.customers = action.payload;
      break;
    case AdminActionType.AddCustomer:
      newState.customers.push(action.payload);
      break;
    case AdminActionType.UpdateCustomer:
      const indexToUpdateC = newState.customers.findIndex(
        (c) => c.id === action.payload.id
      );
      if (indexToUpdateC >= 0)
        newState.customers[indexToUpdateC] = action.payload;
      break;
    case AdminActionType.DeleteCustomer:
      const indexToDeleteC = newState.customers.findIndex(
        (c) => c.id === action.payload
      );
      if (indexToDeleteC >= 0) newState.customers.splice(indexToDeleteC, 1);
      break;
  }
  return newState;
}
export const AdminStore = createStore(AdminReducer);
