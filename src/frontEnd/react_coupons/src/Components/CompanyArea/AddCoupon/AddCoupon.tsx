import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import adminService from "../../../Services/AdminService";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/Config";

function AddCoupon(): JSX.Element {
  const formData = new FormData();
  const fileInputRef = useRef(null);
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const navigate = useNavigate();
  async function send(coupon: CouponModel) {
    
    if (coupon.endDate>coupon.startDate){
    try {


      formData.append('file', fileInputRef.current.files[0]);
      const response = await axios.post<string>(
        appConfig.AddImageUrl,formData);
        coupon.image=response.data;

      await companyService.addCoupon(coupon);
      notificationService.success("added");
      navigate("/company/coupons");

    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }

  else 
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
        <input
          type="text" placeholder="Title:"
          {...register("title", {
            required: { value: true, message: "Missing price" },
          })}
        />
        <span>{formState.errors?.title?.message}</span>
        <input
          type="text"placeholder="Description:"
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
          type="number"min="0"
          {...register("amount", {
            required: { value: true, message: "Missing stock" },
            min:{value:0,message:"amount can't be negative"}
          })}
        />
        <span>{formState.errors?.amount?.message}</span>

        <label>Price: </label>
        <input
          type="number"min="0"
          {...register("price", {
            required: { value: true, message: "Missing stock" },
            min:{value:0,message:"price can't be negative"},
          })}
        />
        <span>{formState.errors?.price?.message}</span>

        <label>image: </label>
        <form  encType="multipart/form-data" >
        <input  type="file" ref={fileInputRef}/>
        </form>

        <span>{formState.errors?.image?.message}</span>

        <button className="But" onClick={handleSubmit(send)}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCoupon;
