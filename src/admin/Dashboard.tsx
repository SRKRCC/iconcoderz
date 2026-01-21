import { useState } from "react";

/* ================= MOCK DATA ================= */
interface User {
  id: string;
  registrationCode: string;
  fullName: string;
  branch: string;
  yearOfStudy: string;
  paymentStatus: "PENDING" | "VERIFIED" | "REJECTED";
  createdAt: string;
}

const users: User[] = [
  {
    id: "1",
    registrationCode: "IC2K26-0001",
    fullName: "Ashok Bongu",
    branch: "CSE",
    yearOfStudy: "THIRD_YEAR",
    paymentStatus: "PENDING",
    createdAt: "2026-01-21T10:00:00",
  },
  {
    id: "2",
    registrationCode: "IC2K26-0002",
    fullName: "Sai Praneeth",
    branch: "ECE",
    yearOfStudy: "SECOND_YEAR",
    paymentStatus: "VERIFIED",
    createdAt: "2026-01-21T11:00:00",
  },
  {
    id: "3",
    registrationCode: "IC2K26-0003",
    fullName: "Nikhil Reddy",
    branch: "IT",
    yearOfStudy: "FOURTH_YEAR",
    paymentStatus: "REJECTED",
    createdAt: "2026-01-21T12:00:00",
  },
];

/* ================= COMPONENT ================= */
const AdminDashboard = () => {
  const [currentDate] = useState(new Date().toLocaleString());

  // Metrics
  const totalParticipants = users.length;
  const verifiedPayments = users.filter((u) => u.paymentStatus === "VERIFIED").length;
  const pendingPayments = users.filter((u) => u.paymentStatus === "PENDING").length;
  const rejectedPayments = users.filter((u) => u.paymentStatus === "REJECTED").length;

  // Branch distribution
  const branchCounts = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.branch] = (acc[u.branch] || 0) + 1;
    return acc;
  }, {});

  // Recent registrations
  const recentRegistrations = [...users].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Iconcoderz 2k26 Admin Dashboard</h1>
        <span className="text-sm text-muted-foreground">{currentDate}</span>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 text-blue-700 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-blue-500  text-sm">Total Participants</span>
          <span className="text-2xl font-bold mt-2">{totalParticipants}</span>
        </div>
        <div className="bg-green-100 text-green-700 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-sm font-medium">Verified Payments</span>
          <span className="text-2xl font-bold mt-2">{verifiedPayments}</span>
        </div>
        <div className="bg-yellow-100 text-yellow-700 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-sm font-medium">Pending Payments</span>
          <span className="text-2xl font-bold mt-2">{pendingPayments}</span>
        </div>
        <div className="bg-red-100 text-red-700 rounded-xl p-6 shadow-md flex flex-col items-center">
          <span className="text-sm font-medium">Rejected Payments</span>
          <span className="text-2xl font-bold mt-2">{rejectedPayments}</span>
        </div>
      </div>

      {/* Branch Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Branch Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.keys(branchCounts).map((branch) => (
            <div
              key={branch}
              className="bg-pink-100 rounded-lg p-4 flex flex-col items-center shadow"
            >
              <span className="text-sm text-pink-500">{branch}</span>
              <span className="text-xl font-bold text-pink-500">{branchCounts[branch]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
        <div className="glass-card rounded-xl overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Branch</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{user.registrationCode}</td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.branch}</td>
                  <td className="px-4 py-3">{user.yearOfStudy}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.paymentStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : user.paymentStatus === "VERIFIED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2026 Iconcoderz 2k26. All rights reserved.
      </div>
    </div>
  );
};

export default AdminDashboard;
