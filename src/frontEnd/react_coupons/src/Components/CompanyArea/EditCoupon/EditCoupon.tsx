import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import adminService from "../../../Services/AdminService";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import { useEffect, useRef } from "react";
import appConfig from "../../../Utils/Config";
import axios from "axios";
function EditCoupon(): JSX.Element {
  const formData = new FormData();
  const fileInputRef = useRef(null);
  const { register, handleSubmit, formState, setValue } =
    useForm<CouponModel>();
  const navigate = useNavigate();
  const params = useParams();
  const id = +params.couponId;
  useEffect(() => {
    companyService
      .getCoupon(id)
      .then((p) => {
        setValue("category", p.category);
        setValue("companyID", p.companyID);
        setValue("title", p.title);
        setValue("description", p.description);
        setValue("startDate", p.startDate);
        setValue("endDate", p.endDate);
        setValue("amount", p.amount);
        setValue("price", p.price);
        setValue("image", p.image);
      })
      .catch((err) => notificationService.error(err));
  }, []);

  async function send(coupon: CouponModel) {
    if (coupon.endDate>coupon.startDate){
    coupon.id = id;
    try {
if(fileInputRef.current.files[0]!=undefined){
      formData.append('file', fileInputRef.current.files[0]);
      const response = await axios.post<string>(
        appConfig.AddImageUrl,formData);
        coupon.image=response.data;
      }
      
      await companyService.updateCoupon(coupon);
      notificationService.success("updated");
      navigate("/company/coupons");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }else
  notificationService.error("can't add coupon with start date after end date");
  }
  return (
    <div className="couponForm Box">
      <form>
        <label>Category: </label>
        <select name="category" {...register("category")}>
          <option value="SPORT">Sport</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="CLOTHING">Clothing</option>
          <option value="CAMPING">Camping</option>
        </select>
        <br />
        <br />
        <span>{formState.errors?.category?.message}</span>

        {/* <label>Title: </label> */}
        <input
          type="text"
          {...register("title", {
            required: { value: true, message: "Missing price" },
          })}
        />
        <span>{formState.errors?.title?.message}</span>
        {/* <label>Description: </label> */}
        <input
          type="text" 
          {...register("description", {
            required: { value: true, message: "Missing stock" },
          })}
        />
        <span>{formState.errors?.description?.message}</span>
        <label>Start Date: </label>
        <input
          type="Date"
          {...register("startDate", {
            required: { value: true, message: "Missing stock" },

          })}
        />
        <span>{formState.errors?.startDate?.message}</span>

        <label>End Date: </label>
        <input
          type="Date"
          {...register("endDate", {
            required: { value: true, message: "Missing stock" },
          })}
        />
        <span>{formState.errors?.endDate?.message}</span>

        <label>Amount: </label>
        <input
          type="number"
          {...register("amount", {
            required: { value: true, message: "Missing stock" },
            min:{value:0,message:"price can't be negative"}
          })}
        />
        <span>{formState.errors?.amount?.message}</span>

        <label>Price: </label>
        <input
          type="number"
          {...register("price", {
            required: { value: true, message: "Missing stock" },
            min:{value:0,message:"price can't be negative"}
          })}
        />
        <span>{formState.errors?.price?.message}</span>

        <label>image: </label>
        <form encType="multipart/form-data" >
        <input type="file" ref={fileInputRef}/>
        </form>

        <span>{formState.errors?.image?.message}</span>

        <button className="But" onClick={handleSubmit(send)}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCoupon;
