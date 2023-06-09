package app.core.services;

import app.core.entites.Company;
import app.core.entites.Customer;
import app.core.exeptions.ClientServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
/**
 * Service class that handles operations related to admin functionality
 *
 * @author admin
 */
@Service
@Transactional
public class AdminService extends ClientService {


    /**
     * Adds a new company to the database
     * @param company the new company to be added
     * @return the added company
     * @throws ClientServiceException if a company with the same email or name already exists in the database
     */
    public Company addCompany(Company company) throws ClientServiceException {
        if(companyRepo.existsByEmailOrName(company.getEmail(), company.getName()))
            throw new ClientServiceException("the company: ("+company.getName()+ ","+company.getEmail()+ ") already exist");
        return companyRepo.save(company);
    }

    /**
     * Updates an existing company in the database.
     * @param company the updated company
     * @return the updated company
     * @throws ClientServiceException if the company to be updated is not found in the database or if the name of the company to be updated is different from the name of the existing company
     */
    public Company updateCompany(Company company) throws ClientServiceException {
        if(!Objects.equals(getOneCompany(company.getId()).getName(), company.getName()))
            throw new ClientServiceException("the companies name should by same("+company.getName()+" != "+getOneCompany(company.getId()).getName()+")");
           return companyRepo.save(company);
    }

    /**
     * Deletes a company from the database
     * @param companyID the id of the company to be deleted
     * @throws ClientServiceException if the company does not exist in the database
     */
    public void deleteCompany(int companyID) throws ClientServiceException{
            companyRepo.deleteById(companyID);
    }

    /**
     * Get all the companies in the database
     * @return a list of all the companies in the database
     */
    public List<Company> getAllCompanies(){
        return companyRepo.findAll();
    }

    /**
     * Get a company by id
     * @param companyID the id of the company to be retrieved
     * @throws ClientServiceException if the company does not exist in the database
     * @return the company with the specified id
     */
    public Company getOneCompany(int companyID)throws ClientServiceException{
            return companyRepo.findById(companyID).orElseThrow(()->new ClientServiceException("the company dose not exist"));
    }
    /**
     * Adds a new customer to the database
     * @param customer the new customer to be added
     * @return the added customer
     * @throws ClientServiceException if a customer with the same email already exists in the database
     */
    public Customer addCustomer(Customer customer) throws ClientServiceException {
        if(customerRepo.existsByEmail(customer.getEmail()))
            throw new ClientServiceException("can't add: customer with email : "+customer.getEmail()+" already exist");
           return customerRepo.save(customer);
    }
    /**
     * Updates an existing customer in the database.
     * @param customer the updated customer
     * @return the updated customer
     * @throws ClientServiceException if the customer to be updated is not found in the database
     */
    public Customer updateCustomer(Customer customer) throws ClientServiceException {
        getOneCustomer(customer.getId());
        return customerRepo.save(customer);
    }
    /**
     * Deletes a customer from the database
     * @param customerID the id of the customer to be deleted
     * @throws ClientServiceException if the customer does not exist in the database
     */
    public void deleteCustomer(int customerID) throws ClientServiceException{
            customerRepo.deleteById(customerID);
    }
    /**
     * Get all the customers in the database
     * @return a list of all the customers in the database
     */
    public List<Customer> getAllCustomers(){
        return customerRepo.findAll();
    }
    /**
     * Get a customer by id
     * @param customerID the id of the customer to be retrieved
     * @throws ClientServiceException if the customer does not exist in the database
     * @return the customer with the specified id
     */
    public Customer getOneCustomer(int customerID) throws ClientServiceException{
            return customerRepo.findById(customerID).orElseThrow(()->new ClientServiceException("the customer: dose not exist"));
    }

}
