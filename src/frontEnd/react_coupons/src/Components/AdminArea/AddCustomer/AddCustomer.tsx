import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

function AddCustomer(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CustomerModel>();
  const navigate = useNavigate();
  async function send(customer: CustomerModel) {
    try {
      await adminService.addCustomer(customer);
      notificationService.success("added");
      navigate("/admin/customers");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }
  return (
    <div className="AddCustomer Box addForm">
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
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCustomer;
