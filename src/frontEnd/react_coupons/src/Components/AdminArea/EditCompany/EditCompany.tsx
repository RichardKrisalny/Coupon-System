import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

function EditCompany(): JSX.Element {
  const { register, handleSubmit, formState, setValue } =
    useForm<CompanyModel>();
  const navigate = useNavigate();
  const params = useParams();

  const id = +params.companyId;

  useEffect(() => {
    adminService
      .getCompany(id)
      .then((p) => {
        setValue("name", p.name);
        setValue("email", p.email);
        setValue("password", p.password);
      })
      .catch((err) => notificationService.error(err));
  }, []);
  async function send(company: CompanyModel) {
    company.id = id;

    try {
      await adminService.updateCompany(company);
      notificationService.success("updated");
      navigate("/admin/companies");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }
  return (
    <div className="EditCompany addForm Box">
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
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCompany;
