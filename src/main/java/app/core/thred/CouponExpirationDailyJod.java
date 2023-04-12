package app.core.thred;

import app.core.entites.Coupon;
import app.core.repositories.CouponRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class CouponExpirationDailyJod {
    @Autowired
    private CouponRepo couponRepo;


    /**
     * check every 30 seconds if database have expired coupons and delete them
     */
    @Scheduled(timeUnit = TimeUnit.SECONDS,fixedRate = 5)
    public void run() {
        List<Coupon>coupons;
        LocalDate now=LocalDate.now();
            coupons=couponRepo.findByEndDateBetween(LocalDate.MIN,now);
            if(!coupons.isEmpty()) {
                for (int i = 0; i < coupons.size(); i++) {
                    System.out.println("DELETE coupon number:  "+coupons.get(i).getId());
                    couponRepo.delete(coupons.get(i));
                }
            }
        }
    }

