import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: adminApi.getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load dashboard</p>
          <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
        </div>
      </div>
      

    );
  }

  if (!stats) return null;

  // Metrics
  const totalParticipants = stats.totalParticipants;
  const verifiedPayments = stats.verifiedPayments;
  const pendingPayments = stats.pendingPayments;
  const rejectedPayments = stats.rejectedPayments;

  // Branch distribution
  const branchCounts = stats.branchDistribution;

  // Recent registrations
  const recentRegistrations = stats.recentRegistrations;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Iconcoderz 2k26 Admin Dashboard</h1>
        <span className="text-sm text-muted-foreground">{new Date().toLocaleString()}</span>
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

      <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">College Distribution</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries({
              "Shri Vishnu Engineering College for Women": 145,
              "Vishnu Institute of Technology": 1,
              "Swarnandhra College of Engineering and Technology": 2,
              "SRKR Engineering College": 102,
              "Sasi Institute of Technology": 1,
              "Adithya Engineering College": 4,
            }).map(([college, count]) => (
              <div
                key={college}
                className="bg-pink-100 rounded-lg p-4 flex flex-col items-center shadow hover:scale-105 transition"
              >
                <span className="text-sm text-pink-600 text-center font-medium">
                  {college}
                </span>
                <span className="text-2xl font-bold text-pink-700 mt-2">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

      {/* Branch Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Branch Distribution</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
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

      {/* Year Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Year Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(stats.yearDistribution)
            .sort((a, b) => {
              const order = ["FIRST_YEAR", "SECOND_YEAR", "THIRD_YEAR", "FOURTH_YEAR"];
              return order.indexOf(a) - order.indexOf(b);
            })
            .map((year) => (
            <div
              key={year}
              className="bg-purple-100 rounded-lg p-4 flex flex-col items-center shadow"
            >
              <span className="text-sm text-purple-500">{year.replace(/_/g, " ")}</span>
              <span className="text-xl font-bold text-purple-500">{stats.yearDistribution[year]}</span>
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
