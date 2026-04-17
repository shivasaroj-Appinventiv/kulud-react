import { useState } from "react";
import Sidebar from "../components/sidebar";
import { useAppSelector, type AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../modules/auth/auth.slice";
import { ChevronDown, Menu as MenuIcon, User, X } from "lucide-react";
import { openDialog } from "../redux/slices/global.slice";
import { MenuItem, Menu } from "@mui/material";
import { ROUTES } from "../routes/RouteConstant";

interface DashboardLayoutProps {
  name?: string;
  children: React.ReactNode;
}

const DashboardLayout = ({ children, name }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = useAppSelector((state) => state.auth.admin);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  const handleLogout = async () => {
    const res = await dispatch(logout()).unwrap();
    if (res.data.status) {
      navigate("/login");
    }
  };

  const onLogoutClick = () => {
    handleMenuClose(); // ✅ close menu first
    dispatch(
      openDialog({
        open: true,
        message: "Are you sure you want to logout?",
        onConfirm: handleLogout,
      })
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
            <h1 className="ml-2 text-xl font-semibold text-gray-900">
              {name}
            </h1>
          </div>

          {/* Profile Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleMenuOpen}
          >
            {userData?.profilePicture ? (
              <img
                src={userData.profilePicture}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User size={20} className="text-gray-600" />
            )}
            <span className="text-sm font-medium text-gray-700">
              {userData?.fullName}
            </span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </header>

        {/* ✅ Menu OUTSIDE clickable div */}
        <Menu
          anchorEl={anchorEl}
          open={openProfileMenu}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
          <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
        </Menu>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;