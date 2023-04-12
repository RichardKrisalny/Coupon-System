import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CustomerModel from "../../../Models/CustomerModel";
import { AdminStore } from "../../../Redux/AdminState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "../CustomerCard/CustomerCard";

function AdminCustomersHome(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  useEffect(() => {
    adminService
      .getAllCustomer()
      .then((customers) => setCustomers(customers))
      .catch((err) => notificationService.error(err));

    const unsubscribe = AdminStore.subscribe(() => {
      const dup = [...AdminStore.getState().customers];
      setCustomers(dup);
    });

    return unsubscribe;
  }, []);
  return (
    <div className="Home">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((p) => (
            <CustomerCard key={p.id} customer={p} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminCustomersHome;
