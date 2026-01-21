import { Route } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";

const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
  </Route>
);

export default AdminRoutes;
