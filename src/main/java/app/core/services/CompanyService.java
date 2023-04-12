package app.core.services;

import app.core.entites.Category;
import app.core.entites.Company;
import app.core.entites.Coupon;
import app.core.exeptions.ClientServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class CompanyService extends ClientService{
    @Autowired
    private ImageSevice imageSevice;
    /**
     * Add a new coupon to the database and associate it with the logged in company
     * @param coupon the new coupon to be added
     * @return the added coupon
     * @throws ClientServiceException if a coupon with the same title already exists for the logged in company
     */
    public Coupon addCoupon(Coupon coupon ,int companyID) throws ClientServiceException {
        if(couponRepo.existsByTitleAndCompanyID(coupon.getTitle(),companyID))
            throw new ClientServiceException("you have coupon with same title");
        getCompanyDetails(companyID).addCoupon(coupon);
            return couponRepo.save(coupon);
    }
    /**
     * Update an existing coupon in the database
     * @param coupon the updated coupon
     * @return the updated coupon
     * @throws ClientServiceException if the coupon does not exist in the database or the coupon does not belong to the logged in company.
     */
    public Coupon updateCoupon(Coupon coupon,int companyID) throws ClientServiceException {
        Coupon coupon1= couponRepo.findByIdAndCompanyID(coupon.getId(),companyID).orElseThrow(()->new ClientServiceException("the coupon dose not exist"));
        imageSevice.deleteImage(coupon1.getImage());
        coupon.setCompanyID(companyID);
        coupon.setCustomers(coupon1.getCustomers());
        return couponRepo.save(coupon);
    }
    /**
     * Delete a coupon from the database that is associated with the logged in company
     * @param couponID the id of the coupon to be deleted
     * @throws ClientServiceException if the coupon does not exist in the database or the coupon does not belong to the logged in company
     */
    public void deleteCoupon(int couponID,int companyID) throws ClientServiceException {
        Coupon coupon = couponRepo.findByIdAndCompanyID(couponID,companyID).orElseThrow(()->new ClientServiceException("the coupon dose not exist"));
        couponRepo.delete(coupon);
    }
    /**
     * Get a list of all coupons that belong to the logged in company
     * @return a list of coupons
     */
    public List<Coupon> companyCoupons(int companyID){
        return couponRepo.findByCompanyID(companyID);
    }
    /**
     * Get a list of all coupons that belong to the logged in company and match the specified category
     * @param category the category of the coupons
     * @return a list of coupons
     */
    public List<Coupon> companyCoupons(Category category,int companyID){
        return couponRepo.findByCompanyIDAndCategory(companyID,category);
    }
    /**
     * Get a list of all coupons that belong to the logged in company and have a price less than the specified max price
     * @param maxPrice the maximum price for the coupons
     * @return a list of coupons
     */
    public List<Coupon> companyCoupons(double maxPrice,int companyID){
        return couponRepo.findByCompanyIDAndPriceLessThan(companyID,maxPrice);
    }
    /**
     * Get details of the logged in company
     * @return the company object
     * @throws ClientServiceException if the company with companyID not exists
     */
    public Company getCompanyDetails(int companyID) throws ClientServiceException {
            return companyRepo.findById(companyID).orElseThrow(()->new ClientServiceException("the company dose not exist"));
    }
    public Coupon getCoupon(int couponId) throws ClientServiceException {
            return couponRepo.findById(couponId).orElseThrow(()->new ClientServiceException("the coupon dose not exist"));
    }

}
