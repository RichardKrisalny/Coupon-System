package app.core.controllers;

import app.core.entites.Category;
import app.core.entites.Company;
import app.core.entites.Coupon;
import app.core.exeptions.ClientServiceException;
import app.core.jwt.User;
import app.core.repositories.CompanyRepo;
import app.core.services.CompanyService;
import app.core.services.ImageSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/company")
public class CompanyController {
    @Autowired
     private CompanyService companyService;
    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private ImageSevice imageSevice;


    @PostMapping(value = "/addCoupon" ,headers = { HttpHeaders.AUTHORIZATION })
    public Coupon addCoupon(@RequestBody Coupon coupon , HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        try {
            return companyService.addCoupon(coupon,id);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PutMapping(value = "/updateCoupon" ,headers = { HttpHeaders.AUTHORIZATION })
    public Coupon updateCoupon(@RequestBody Coupon coupon,HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        try {
            return companyService.updateCoupon(coupon,id);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @DeleteMapping (value = "/deleteCoupon" ,headers = { HttpHeaders.AUTHORIZATION })
    public void deleteCoupon(int couponID,HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        try {
            imageSevice.deleteImage(getCoupon(couponID).getImage());
            companyService.deleteCoupon(couponID,id);
        } catch (ClientServiceException e) {
            System.out.println(e.getMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    @GetMapping  (value = "/companyCoupons" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon> companyCoupons(HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        return  companyService.companyCoupons(id);
    }
    @GetMapping  (value = "/companyCouponsByCategory" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon> companyCoupons(@RequestParam Category category,HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        return companyService.companyCoupons(category,id);
    }
    @GetMapping  (value = "/companyCouponsByMaxPrice" ,headers = { HttpHeaders.AUTHORIZATION })
    public List<Coupon> companyCoupons(double maxPrice,HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        return companyService.companyCoupons(maxPrice,id);
    }
    @GetMapping  (value = "/company" ,headers = { HttpHeaders.AUTHORIZATION })
    public Company getCompanyDetails(HttpServletRequest req) throws ClientServiceException {
        User user = (User) req.getAttribute("user");
        int id = companyRepo.findByEmail(user.getEmail()).orElseThrow(()->new ClientServiceException("can't find the company ")).getId();
        return companyService.getCompanyDetails(id);
    }
    @GetMapping  (value = "/coupon" ,headers = { HttpHeaders.AUTHORIZATION })
    public Coupon getCoupon(int couponId) throws ClientServiceException {
        return companyService.getCoupon(couponId);
    }


}
