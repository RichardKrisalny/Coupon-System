package app.core.controllers;

import app.core.entites.Company;
import app.core.entites.Customer;
import app.core.exeptions.ClientServiceException;
import app.core.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping(value = "/addCompany" ,headers = { HttpHeaders.AUTHORIZATION })
    public Company addCompany(@RequestBody Company company){
        try {
            return adminService.addCompany(company);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PutMapping(value = "/updateCompany" ,headers = { HttpHeaders.AUTHORIZATION })
    public Company updateCompany(@RequestBody Company company){
        try {
            return adminService.updateCompany(company);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @DeleteMapping (value = "/deleteCompany" , headers = { HttpHeaders.AUTHORIZATION })
    public void deleteCompany(int companyID){
        try {
            adminService.deleteCompany(companyID);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @GetMapping (value = "/getAllCompanies" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Company> getAllCompanies(){
        return adminService.getAllCompanies();
    }
    @GetMapping(value = "/getCompany" ,headers = { HttpHeaders.AUTHORIZATION })
    public Company getOneCompany(int companyID){
        try {
            return adminService.getOneCompany(companyID);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @PostMapping(value = "/addCustomer" ,headers = { HttpHeaders.AUTHORIZATION })
    public Customer addCustomer(@RequestBody Customer customer){
        try {
            return adminService.addCustomer(customer);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PutMapping(value = "/updateCustomer" ,headers = { HttpHeaders.AUTHORIZATION })
    public Customer updateCustomer(@RequestBody Customer customer){
        try {
            return adminService.updateCustomer(customer);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @DeleteMapping (value = "/deleteCustomer" ,headers = { HttpHeaders.AUTHORIZATION })
    public void deleteCustomer(int customerID){
        try {
            adminService.deleteCustomer(customerID);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @GetMapping (value = "/getAllCustomers" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Customer> getAllCustomers(){
        return adminService.getAllCustomers();
    }
    @GetMapping (value = "/getCustomer" ,headers = { HttpHeaders.AUTHORIZATION })
    public Customer getOneCustomer(int customerID){
        try {
            return adminService.getOneCustomer(customerID);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}
