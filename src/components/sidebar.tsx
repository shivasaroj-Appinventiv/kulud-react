import { LayoutDashboard, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/RouteConstant";
import { useAppSelector, type AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../modules/auth/auth.slice";
import { useEffect } from "react";
import Avatar from "./Avatar";
 
const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.DASHBOARD },
    { icon: Users, label: "User Management", path: ROUTES.USER_MANAGEMENT },
    { icon: Users, label: "CMS Management", path: ROUTES.CMS },
  ];
 
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const userData = useAppSelector((state) => state.auth.admin);
 
  useEffect(() => {
    if (!userData?.email) {
      dispatch(getProfileDetails());
    }
  }, []);
 
  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === ROUTES.DASHBOARD;
    }
    return location.pathname.startsWith(path);
  };
 
  return (
    <div className="bg-white h-full shadow-lg flex flex-col">
 
      {/* Logo — same height as header (h-16) so they align */}
      <div className="h-16 px-5 flex items-center border-b border-gray-200 flex-shrink-0">
        <h1 className="text-xl font-bold text-blue-600">MYLZ</h1>
      </div>
 
      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`
              flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150
              ${isActive(item.path)
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <item.icon size={18} className="mr-3 flex-shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>
 
      {/* ── User section — synced with header avatar ───────────────────── */}
      <div className="p-3 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-gray-50">
          {/* ✅ Same Avatar component as header */}
          <Avatar
            profilePicture={userData?.profilePicture}
            fullName={userData?.fullName}
            size="sm"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-gray-800 truncate leading-tight">
              {userData?.fullName || "User"}
            </span>
            <span className="text-xs text-gray-400 truncate leading-tight">
              {userData?.email || ""}
            </span>
          </div>
        </div>
      </div>
 
    </div>
  );
};
 
export default Sidebar;