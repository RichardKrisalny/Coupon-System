import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

function AddCompany(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CompanyModel>();
  const navigate = useNavigate();
  async function send(company: CompanyModel) {
    try {
      await adminService.addCompany(company);
      notificationService.success("added");
      navigate("/admin/companies");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }
  return (
    <div className="AddCompany Box addForm">
      <form>
        <label>Name: </label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Missing name" },
          })}
        />
        <span>{formState.errors?.name?.message}</span>

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

export default AddCompany;
