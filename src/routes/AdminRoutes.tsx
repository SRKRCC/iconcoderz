import { Route } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Outbox from "../admin/Outbox";
import Attendance from "../admin/Attendance";
import AttendanceList from "../admin/AttendanceList"; 

const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="users" element={<Users />} />
    <Route path="outbox" element={<Outbox />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="attendance-list" element={<AttendanceList />} />
  </Route>
);

export default AdminRoutes;
