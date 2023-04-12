package app.core.controllers;

import app.core.entites.Category;
import app.core.entites.Coupon;
import app.core.entites.Customer;
import app.core.exeptions.ClientServiceException;
import app.core.jwt.User;
import app.core.repositories.CustomerRepo;
import app.core.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomerRepo customerRepo;

    @PostMapping(value = "/purchase" ,headers = { HttpHeaders.AUTHORIZATION })
    public void purchase( int couponID, HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = customerRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the customer ")).getId();
        try {
            customerService.purchase(couponID,id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping(value = "/CustomerCoupons" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon> getCustomerCoupons(HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = customerRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the customer ")).getId();
        return  customerService.getCustomerCoupons(id);
    }
    @GetMapping(value = "/AllCoupons" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon> getAllCoupons(HttpServletRequest req) throws ClientServiceException {
        return  customerService.getAllCoupons();
    }

    @GetMapping(value = "/CustomerCouponsByCategory" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon>getCustomerCoupons(@RequestParam Category category,HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = customerRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the customer ")).getId();
        return customerService.getCustomerCoupons(category,id);
    }

    @GetMapping(value = "/CustomerCouponsByMaxPrice" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon>getCustomerCoupons(double maxPrice,HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = customerRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the customer ")).getId();
        return customerService.getCustomerCoupons(maxPrice,id);
    }

    @GetMapping(value = "/Customer" ,headers = { HttpHeaders.AUTHORIZATION })
    public Customer getCustomerDetails(HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = customerRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the customer ")).getId();
        return customerService.getCustomerDetails(id);
    }
}
