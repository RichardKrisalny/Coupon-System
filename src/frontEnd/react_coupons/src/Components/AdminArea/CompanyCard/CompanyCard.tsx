import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

interface CompanyCardProps {
  company: CompanyModel;
}
function CompanyCard(props: CompanyCardProps): JSX.Element {
  async function deleteCompany() {
    if (window.confirm("Are you sure?")) {
      try {
        await adminService.deleteCompany(props.company.id);
        notificationService.success("Company Deleted");
      } catch (error: any) {
        notificationService.error(error);
      }
    }
  }
  return (
    <tr>
      <td>{props.company.name} </td>
      <td>{props.company.email} </td>
      <td>{props.company.password} </td>
      <td>
        <NavLink
          className={"a"}
          to={"/admin/updateCompany/" + props.company.id}
        >
          ⬆️
        </NavLink>{" "}
      </td>
      <td>
        {" "}
        <NavLink className={"a"} to="" onClick={deleteCompany}>
          ❌
        </NavLink>{" "}
      </td>
    </tr>
  );
}

export default CompanyCard;
