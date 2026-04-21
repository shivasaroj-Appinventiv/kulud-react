import { LayoutDashboard, Building, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/RouteConstant";
import { useAppSelector, type AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../modules/auth/auth.slice";
import { useEffect } from "react";

const Sidebar = () => {
   const VITE_IMAGE_PREFIX = import.meta.env.VITE_IMAGE_PREFIX;
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.DASHBOARD },
    { icon: Building, label: "Organizations", path: ROUTES.ORGANIZATIONS },
    { icon: Users , label: "User Management", path: ROUTES.USER_MANAGEMENT },
  ];
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfileDetails());
  }, []);

  const userData = useAppSelector((state) => state.auth.admin);

  return (
    <div className="bg-white h-full shadow-lg flex flex-col">
      {/* Logo */}
      <div className="px-5 py-[16px] border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">MYLZ</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`
              flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg  hover:bg-gray-100 transition-colors">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              {userData?.profilePicture ? (
                <img
                  src={VITE_IMAGE_PREFIX+ userData?.profilePicture}
                  alt="user image"
                  className="w-10 rounded-full"
                />
              ) : (
                <User size={20} className="text-gray-600" />
              )}
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Hi {userData.fullName || "User"}
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
