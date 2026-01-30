import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../api/admin";
import type { User } from "../api/registration";
import { Loader2, Search, X } from "lucide-react";

export type YearOfStudy =
  | "FIRST_YEAR"
  | "SECOND_YEAR"
  | "THIRD_YEAR"
  | "FOURTH_YEAR";

export type Branch =
  | "CSE"
  | "CSBS"
  | "CSD"
  | "CSIT"
  | "IT"
  | "AI_DS"
  | "AI_ML"
  | "ECE"
  | "EEE"
  | "MECH"
  | "CIVIL"
  | "CHEM"
  | "BIO"
  | "OTHER";

export type Gender = "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY";

export type PaymentStatus = "PENDING" | "VERIFIED" | "REJECTED";

const yearOptions: { label: string; value: string }[] = [
  { label: "All Years", value: "" },
  { label: "1st Year", value: "FIRST_YEAR" },
  { label: "2nd Year", value: "SECOND_YEAR" },
  { label: "3rd Year", value: "THIRD_YEAR" },
  { label: "4th Year", value: "FOURTH_YEAR" },
];

const branchOptions: { label: string; value: string }[] = [
  { label: "All Branches", value: "" },
  { label: "CSE", value: "CSE" },
  { label: "CSBS", value: "CSBS" },
  { label: "CSD", value: "CSD" },
  { label: "CSIT", value: "CSIT" },
  { label: "IT", value: "IT" },
  { label: "AI & DS", value: "AI_DS" },
  { label: "AI & ML", value: "AI_ML" },
  { label: "ECE", value: "ECE" },
  { label: "EEE", value: "EEE" },
  { label: "MECH", value: "MECH" },
  { label: "CIVIL", value: "CIVIL" },
  { label: "CHEM", value: "CHEM" },
  { label: "BIO", value: "BIO" },
  { label: "Other", value: "OTHER" },
];

const paymentStatusOptions: { label: string; value: string }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Verified", value: "VERIFIED" },
  { label: "Rejected", value: "REJECTED" },
];

const statusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  VERIFIED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const selectStyles = "px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

const DetailRow = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className={`text-sm text-foreground text-right break-all ${mono ? "font-mono" : ""}`}>{value}</span>
  </div>
);

const Users = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filterBranch, setFilterBranch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const hasActiveFilters = filterStatus || filterYear || filterBranch || debouncedSearch;

  const clearFilters = () => {
    setFilterStatus("");
    setFilterYear("");
    setFilterBranch("");
    setSearchQuery("");
    setDebouncedSearch("");
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Registration Code",
      "Full Name",
      "Email",
      "Phone",
      "College Name",
      "Registration Number",
      "Year",
      "Branch",
      "Gender",
      "Coding Club Affiliate",
      "Affiliate ID",
      "Codechef Handle",
      "Leetcode Handle",
      "Codeforces Handle",
      "Transaction ID",
      "Payment Status",
      "Attended",
      "Attended At",
      "Registered At",
    ];

    const yearMap: Record<string, string> = {
      FIRST_YEAR: "1st Year",
      SECOND_YEAR: "2nd Year",
      THIRD_YEAR: "3rd Year",
      FOURTH_YEAR: "4th Year",
    };

    const rows = users.map((user) => [
      user.registrationCode || "",
      user.fullName || "",
      user.email || "",
      user.phone || "",
      user.collegeName || "SRKR Engineering College",
      user.registrationNumber || "",
      yearMap[user.yearOfStudy] || user.yearOfStudy || "",
      user.branch || "",
      user.gender || "",
      user.isCodingClubAffiliate ? "Yes" : "No",
      user.affiliateId || "",
      user.codechefHandle || "",
      user.leetcodeHandle || "",
      user.codeforcesHandle || "",
      user.transactionId || "",
      user.paymentStatus || "",
      user.attended ? "Yes" : "No",
      user.attendedAt ? new Date(user.attendedAt).toLocaleString() : "-",
      user.createdAt ? new Date(user.createdAt).toLocaleString() : "-",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["admin", "users", filterStatus, filterYear, filterBranch, debouncedSearch],
    queryFn: () =>
      adminApi.getUsers({
        paymentStatus: filterStatus || undefined,
        yearOfStudy: filterYear || undefined,
        branch: filterBranch || undefined,
        search: debouncedSearch || undefined,
      }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: PaymentStatus }) =>
      adminApi.updatePaymentStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      if (selectedUser) {
        setSelectedUser(null);
      }
    },
  });

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    updateStatusMutation.mutate({ userId: id, status });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load users</p>
          <p className="text-sm text-muted-foreground">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 flex">
      <div className="flex-1">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-heading">Users</h2>
              <p className="text-muted-foreground">
                {users.length} {users.length === 1 ? "user" : "users"} found
              </p>
            </div>
            <button
              onClick={exportToCSV}
              disabled={users.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              📥 Export CSV
            </button>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, email, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className={selectStyles}
              >
                {yearOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className={selectStyles}
              >
                {branchOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={selectStyles}
              >
                {paymentStatusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-muted/30 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-4 py-3 font-medium">{user.registrationCode}</td>
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.branch}</td>
                  <td className="px-4 py-3">{user.yearOfStudy}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[user.paymentStatus]}`}
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

      {/* ========== SIDE PANEL ========== */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-background shadow-2xl transform transition-transform duration-300 ${
          selectedUser ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedUser && (
          <div className="p-6 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">{selectedUser.fullName}</h3>
                <p className="text-sm text-muted-foreground font-mono mt-1">{selectedUser.registrationCode}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              
              {/* Payment Status Banner */}
              <div className={`p-4 rounded-xl ${
                selectedUser.paymentStatus === "VERIFIED" ? "bg-green-100 dark:bg-green-900/30" :
                selectedUser.paymentStatus === "REJECTED" ? "bg-red-100 dark:bg-red-900/30" :
                "bg-yellow-100 dark:bg-yellow-900/30"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Payment Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[selectedUser.paymentStatus]}`}>
                    {selectedUser.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <div className="glass-card p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Personal Info</h4>
                <DetailRow label="Reg. Number" value={selectedUser.registrationNumber} />
                <DetailRow label="Email" value={selectedUser.email} />
                <DetailRow label="Phone" value={selectedUser.phone} />
                <DetailRow label="College" value={selectedUser.collegeName} />
                <DetailRow label="Coding Club" value={selectedUser.isCodingClubAffiliate ? `Yes (${selectedUser.affiliateId || 'No ID'})` : "No"} />
                <DetailRow label="Gender" value={selectedUser.gender} />
              </div>

              {/* Academic Information */}
              <div className="glass-card p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Academic</h4>
                <DetailRow label="Branch" value={selectedUser.branch} />
                <DetailRow label="Year" value={yearOptions.find(y => y.value === selectedUser.yearOfStudy)?.label || selectedUser.yearOfStudy} />
              </div>

              {/* Competitive Programming Handles */}
              {(selectedUser.codechefHandle || selectedUser.leetcodeHandle || selectedUser.codeforcesHandle) && (
                <div className="glass-card p-4 rounded-xl space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">CP Handles</h4>
                  {selectedUser.codechefHandle && <DetailRow label="Codechef" value={selectedUser.codechefHandle} />}
                  {selectedUser.leetcodeHandle && <DetailRow label="Leetcode" value={selectedUser.leetcodeHandle} />}
                  {selectedUser.codeforcesHandle && <DetailRow label="Codeforces" value={selectedUser.codeforcesHandle} />}
                </div>
              )}

              {/* Payment Details */}
              <div className="glass-card p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Payment</h4>
                <DetailRow label="Transaction ID" value={selectedUser.transactionId} mono />
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Screenshot</p>
                  <a href={selectedUser.screenshotUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={selectedUser.screenshotUrl}
                      alt="Payment Screenshot"
                      className="w-full rounded-lg border border-border hover:opacity-90 transition-opacity cursor-zoom-in"
                    />
                  </a>
                </div>
              </div>

              {/* Attendance Status */}
              <div className="glass-card p-4 rounded-xl space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Attendance</h4>
                <DetailRow label="Status" value={selectedUser.attended ? "✅ Attended" : "⏳ Not Yet"} />
                {selectedUser.attendedAt && (
                  <DetailRow label="Checked In" value={new Date(selectedUser.attendedAt).toLocaleString()} />
                )}
              </div>

            </div>

            {/* Payment Actions */}
            {selectedUser.paymentStatus === "PENDING" && (
              <div className="mt-6 pt-4 border-t border-border flex gap-3">
                <button
                  onClick={() => updatePaymentStatus(selectedUser.id, "VERIFIED")}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => updatePaymentStatus(selectedUser.id, "REJECTED")}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Decline
                </button>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-border">
              <button
                onClick={async () => {
                  if (!confirm('Delete this user? This will soft-delete the account and can be restored from the DB.')) return;
                  try {
                    const res = await adminApi.deleteUsers([selectedUser.id]);
                    if (res?.success?.length) {
                      alert('User deleted');
                      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
                      setSelectedUser(null);
                    } else {
                      alert('Delete failed');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Failed to delete user');
                  }
                }}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Delete User
              </button>
            </div>          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
