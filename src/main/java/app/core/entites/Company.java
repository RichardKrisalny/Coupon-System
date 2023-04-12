package app.core.entites;
import app.core.jwt.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
@Entity
@ToString(exclude = "coupons")
public class Company extends User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    private String name;
    private String email;
    private String password;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "company_id")
    @JsonIgnore
   private List<Coupon> coupons=new ArrayList<>();
    public void addCoupon(Coupon coupon){
        if (coupons ==null){
            coupons=new ArrayList<>();
        }
        coupon.setCompanyID(this.id);
        coupons.add(coupon);
    }
}
