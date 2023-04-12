import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerModel from "../../../Models/CustomerModel";
function EditCustomer(): JSX.Element {
  const { register, handleSubmit, formState, setValue } =
    useForm<CustomerModel>();
  const navigate = useNavigate();
  const params = useParams();
  const id = +params.customerId;

  useEffect(() => {
    adminService
      .getCustomer(id)
      .then((p) => {
        setValue("firstName", p.firstName);
        setValue("lastName", p.lastName);
        setValue("email", p.email);
        setValue("password", p.password);
      })
      .catch((err) => notificationService.error(err));
  }, []);
  async function send(customer: CustomerModel) {
    customer.id = id;

    try {
      await adminService.updateCustomer(customer);
      notificationService.success("updated");
      navigate("/admin/customers");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }
  return (
    <div className="EditCustomer addForm Box">
      <form>
        <label>First Name: </label>
        <input
          type="text"
          {...register("firstName", {
            required: { value: true, message: "Missing name" },
          })}
        />
        <span>{formState.errors?.firstName?.message}</span>
        <label>Last Name: </label>
        <input
          type="text"
          {...register("lastName", {
            required: { value: true, message: "Missing name" },
          })}
        />
        <span>{formState.errors?.lastName?.message}</span>

        <label>Email: </label>
        <input
          type="text"
          {...register("email", {
            required: { value: true, message: "Missing price" },
          })}
        />
        <span>{formState.errors?.email?.message}</span>
        <label>Password: </label>
        <input
          type="text"
          {...register("password", {
            required: { value: true, message: "Missing stock" },
          })}
        />
        <span>{formState.errors?.password?.message}</span>

        <button className="But" onClick={handleSubmit(send)}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCustomer;
