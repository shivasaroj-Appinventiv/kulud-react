import React, { useEffect } from "react";
import { useUserDetailsHelper } from "./user.details.helper";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
    const navigate= useNavigate();
    // useEffect()
    // const {details} = useUserDetailsHelper()
  const user = {
    profilePic: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // sample
    status: "Active",
    userId: "AD1776059735585",
    name: "Shahrukh",
    createdOn: "13 Apr, 2026",
    email: "sk@yopmail.com",
    phone: "-",
    branch: "al mashraniya",
    role: "sk role",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 relative">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
          {user.status}
        </span>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={user.profilePic}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
        {/* Column 1 */}
        <div>
          <p className="text-red-700 font-medium">User ID</p>
          <p className="text-gray-600">{user.userId}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Name</p>
          <p className="text-gray-600">{user.name}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Created On</p>
          <p className="text-gray-600">{user.createdOn}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Email</p>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Phone Number</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Branch</p>
          <p className="text-gray-600">{user.branch}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Role</p>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
