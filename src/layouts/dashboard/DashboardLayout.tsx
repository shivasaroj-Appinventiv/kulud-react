import Sidebar from "../../components/sidebar";
import { ChevronDown, LogOut, Menu as MenuIcon, User, X } from "lucide-react";
import { MenuItem, Menu } from "@mui/material";
import Avatar from "@/components/Avatar";
import useDashboardLayoutHelper from "./dashboardLayout.helper";

interface DashboardLayoutProps {
  name?: string;
  children: React.ReactNode;
}

const DashboardLayout = ({ children, name }: DashboardLayoutProps) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    handleMenuOpen,
    userData,
    openProfileMenu,
    anchorEl,
    handleMenuClose,
    navigateToProfile,
    onLogoutClick,
  } = useDashboardLayoutHelper();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between flex-shrink-0">
          {/* Left — hamburger + page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
            {name && (
              <h1 className="text-[15px] font-semibold text-gray-900">
                {name}
              </h1>
            )}
          </div>

          {/* Right — avatar + name + chevron */}
          <div
            className="flex items-center gap-2.5 cursor-pointer px-3 py-1.5 rounded-xl
                        hover:bg-gray-50 transition-colors"
            onClick={handleMenuOpen}
          >
            {/* ✅ Same Avatar component as sidebar */}
            <Avatar
              profilePicture={userData?.profilePicture}
              fullName={userData?.fullName}
              size="md"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-medium text-gray-800 leading-tight">
                {userData?.fullName || "User"}
              </span>
              <span className="text-xs text-gray-400 leading-tight">
                {userData?.email || ""}
              </span>
            </div>
            <ChevronDown
              size={15}
              className={`text-gray-400 transition-transform duration-200 ${
                openProfileMenu ? "rotate-180" : ""
              }`}
            />
          </div>
        </header>

        {/* Profile dropdown — outside trigger div */}
        <Menu
          anchorEl={anchorEl}
          open={openProfileMenu}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                mt: 0.5,
                width: 180,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "0.5px solid #e5e7eb",
              },
            },
          }}
        >
          <MenuItem onClick={navigateToProfile} sx={{ fontSize: 13, gap: 1.5 }}>
            <User size={15} className="text-gray-400" />
            Profile
          </MenuItem>
          <MenuItem
            onClick={onLogoutClick}
            sx={{ fontSize: 13, gap: 1.5, color: "#ef4444" }}
          >
            <LogOut size={15} className="text-red-400" />
            Logout
          </MenuItem>
        </Menu>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
