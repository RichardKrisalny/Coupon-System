import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

interface CustomerCardProps {
  customer: CustomerModel;
}
function CustomerCard(props: CustomerCardProps): JSX.Element {
  async function deleteCustomer() {
    if (window.confirm("Are you sure?")) {
      try {
        await adminService.deleteCustomer(props.customer.id);
        notificationService.success("Customer Deleted");
      } catch (error: any) {
        notificationService.error(error);
      }
    }
  }
  return (
    <tr>
      <td>{props.customer.firstName} </td>
      <td>{props.customer.lastName} </td>
      <td>{props.customer.email} </td>
      <td>{props.customer.password} </td>
      <td>
        <NavLink
          className={"a"}
          to={"/admin/updateCustomer/" + props.customer.id}
        >
          ⬆️
        </NavLink>{" "}
      </td>
      <td>
        {" "}
        <NavLink className={"a"} to="" onClick={deleteCustomer}>
          ❌
        </NavLink>{" "}
      </td>
    </tr>
  );
}

export default CustomerCard;
