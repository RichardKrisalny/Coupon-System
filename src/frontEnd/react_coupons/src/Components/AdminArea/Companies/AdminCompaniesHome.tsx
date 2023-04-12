import { useEffect, useState } from "react";
import CompanyModel from "../../../Models/CompanyModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";

import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AdminState, AdminStore } from "../../../Redux/AdminState";
import { AuthStore } from "../../../Redux/AuthState";

function AdminCompaniesHome(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);

  useEffect(() => {
    adminService
      .getAllCompanies()
      .then((companies) => setCompanies(companies))
      .catch((err) => notificationService.error(err));

    const unsubscribe = AdminStore.subscribe(() => {
      const dup = [...AdminStore.getState().companies];
      setCompanies(dup);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="Home">
      <Table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((p) => (
            <CompanyCard key={p.id} company={p} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminCompaniesHome;
