import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ThemeToggle from "../context/ThemeToggle";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <h1 className="font-heading gradient-text text-xl">
            Welcome Admin !
          </h1>

          {/* Theme Toggle Placeholder */}
          <ThemeToggle />
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
