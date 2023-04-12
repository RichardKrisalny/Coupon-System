import axios from "axios";
import CompanyModel from "../Models/CompanyModel";
import CustomerModel from "../Models/CustomerModel";
import {
  AddCompaniesAction,
  AddCustomerAction,
  AdminActionType,
  AdminStore,
  DeleteCompanyAction,
  DeleteCustomerAction,
  GetAllCompaniesAction,
  GetAllCustomersAction,
  UpdateCompaniesAction,
  UpdateCustomerAction,
} from "../Redux/AdminState";
import appConfig from "../Utils/Config";

class AdminService {
  public async getAllCompanies(): Promise<CompanyModel[]> {
    if (AdminStore.getState().companies.length === 0) {
      const response = await axios.get<CompanyModel[]>(
        appConfig.getAllCompaniesUrl
      );
      const companies = response.data;
      AdminStore.dispatch(GetAllCompaniesAction(companies));

      return companies;
    }

    return AdminStore.getState().companies;
  }

  public async getCompany(id: number): Promise<CompanyModel> {
    return AdminStore.getState().companies.find((p) => p.id === id);
  }

  public async getAllCustomer(): Promise<CustomerModel[]> {
    if (AdminStore.getState().customers.length === 0) {
      const response = await axios.get<CustomerModel[]>(
        appConfig.getAllCustomersUrl
      );
      const customers = response.data;
      AdminStore.dispatch(GetAllCustomersAction(customers));
      return customers;
    }
    return AdminStore.getState().customers;
  }

  public async getCustomer(id: number): Promise<CustomerModel> {
    return AdminStore.getState().customers.find((p) => p.id === id);
  }

  public async addCompany(company: CompanyModel): Promise<void> {
    const response = await axios.post<CompanyModel>(
      appConfig.addCompanyUrl,
      company
    );
    const addedCompany = response.data;
    AdminStore.dispatch(AddCompaniesAction(addedCompany));
  }

  public async addCustomer(customer: CustomerModel): Promise<void> {
    const response = await axios.post<CustomerModel>(
      appConfig.addCustomerUrl,
      customer
    );
    const addedCustomer = response.data;
    AdminStore.dispatch(AddCustomerAction(addedCustomer));
  }

  public async updateCompany(company: CompanyModel): Promise<void> {
    const response = await axios.put<CompanyModel>(
      appConfig.updateCompanyUrl,
      company
    );
    const updatedCompany = response.data;
    AdminStore.dispatch(UpdateCompaniesAction(updatedCompany));
  }

  public async updateCustomer(customer: CustomerModel): Promise<void> {
    const response = await axios.put<CustomerModel>(
      appConfig.updateCustomerUrl,
      customer
    );
    const updatedCustomer = response.data;
    AdminStore.dispatch(UpdateCustomerAction(updatedCustomer));
  }

  public async deleteCompany(id: number): Promise<void> {
    await axios.delete(appConfig.deleteCompanyUrl + id);
    AdminStore.dispatch({ type: AdminActionType.DeleteCompany, payload: id });
  }

  public async deleteCustomer(id: number): Promise<void> {
    await axios.delete(appConfig.deleteCustomerUrl + id);
    AdminStore.dispatch(DeleteCustomerAction(id));
  }
}
const adminService = new AdminService();
export default adminService;
