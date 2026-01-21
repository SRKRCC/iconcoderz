import { useState } from "react";

/* ================== TYPES ================== */
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

export interface User {
  id: string;
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  branch: Branch;
  yearOfStudy: YearOfStudy;
  gender: Gender;
  transactionId: string;
  screenshotUrl: string;
  paymentStatus: PaymentStatus;
}

/* ================== MOCK DATA ================== */
const initialUsers: User[] = [
  {
    id: "1",
    registrationCode: "IC2K26-0001",
    fullName: "Ashok Bongu",
    email: "ashok@gmail.com",
    phone: "9876543210",
    branch: "CSE",
    yearOfStudy: "THIRD_YEAR",
    gender: "MALE",
    transactionId: "TXN123456",
    screenshotUrl:
      "https://imgv2-1-f.scribdassets.com/img/document/424626648/original/0e766dfd48/1?v=1",
    paymentStatus: "PENDING",
  },
  // Add more users here
];

/* ================== STYLES ================== */
const statusStyles: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  VERIFIED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

/* ================== COMPONENT ================== */
const Users = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const updatePaymentStatus = (id: string, status: PaymentStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, paymentStatus: status } : u))
    );
    if (selectedUser?.id === id) {
      setSelectedUser({ ...selectedUser, paymentStatus: status });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 flex">
      {/* ========== USERS TABLE ========== */}
      <div className="flex-1">
        <h2 className="text-2xl font-heading mb-4">Users</h2>
        <p className="text-muted-foreground mb-6">Manage registered users here.</p>

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
          <div className="p-6 flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedUser.fullName}</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* User Details */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <div>
                <strong>Registration Code:</strong> {selectedUser.registrationCode}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedUser.phone}
              </div>
              <div>
                <strong>Branch:</strong> {selectedUser.branch}
              </div>
              <div>
                <strong>Year of Study:</strong> {selectedUser.yearOfStudy}
              </div>
              <div>
                <strong>Gender:</strong> {selectedUser.gender}
              </div>
              <div>
                <strong>Transaction ID:</strong> {selectedUser.transactionId}
              </div>
              <div>
                <strong>Payment Screenshot:</strong>
                <img
                  src={selectedUser.screenshotUrl}
                  alt="Payment Screenshot"
                  className="mt-2 w-full rounded-lg border border-border"
                />
              </div>
              <div>
                <strong>Payment Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[selectedUser.paymentStatus]}`}
                >
                  {selectedUser.paymentStatus}
                </span>
              </div>
            </div>

            {/* Payment Actions */}
            {selectedUser.paymentStatus === "PENDING" && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => updatePaymentStatus(selectedUser.id, "VERIFIED")}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md"
                >
                  Accept
                </button>
                <button
                  onClick={() => updatePaymentStatus(selectedUser.id, "REJECTED")}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
