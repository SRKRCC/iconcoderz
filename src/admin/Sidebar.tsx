import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Users", path: "/admin/users" },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    navigate('/admin-login');
    onClose();
  };

  return (
    <>
      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading text-xl gradient-text">
            Admin Panel
          </h2>

          <button
            onClick={onClose}
            className="md:hidden text-xl"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={`block px-4 py-2 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-destructive text-white"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
