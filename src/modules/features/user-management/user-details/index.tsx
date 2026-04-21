import Breadcrumb from "../../../../components/breadcrumb";
import { useUserDetailsHelper } from "./user.details.helper";

const UserDetails = () => {
  const VITE_IMAGE_PREFIX = import.meta.env.VITE_IMAGE_PREFIX;
  console.log(VITE_IMAGE_PREFIX,'iiiiii');
  
  const { details, breadcrumbs, onStatusUpdate } = useUserDetailsHelper();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 relative">
      <div className="breadcrumb">
        <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => details && onStatusUpdate(details)}
          className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-all
      ${
        details?.status === "ACTIVE"
          ? "bg-green-100 text-green-600 hover:bg-green-200"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
        >
          {details?.status === "ACTIVE" ? "Active" : "Inactive"}
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={
            details && details?.profilePicture
              ? VITE_IMAGE_PREFIX + details?.profilePicture
              : ""
          }
          alt="profile"
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-10 text-sm">
        {/* Column 1 */}
        <div>
          <p className="text-red-700 font-medium">User ID</p>
          <p className="text-gray-600">{details?.adminId}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Name</p>
          <p className="text-gray-600">{details?.fullName}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Created On</p>
          <p className="text-gray-600">{details?.createdAt}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Email</p>
          <p className="text-gray-600">{details?.email}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Phone Number</p>
          <p className="text-gray-600">{details?.fullPhoneNo}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Branch</p>
          <p className="text-gray-600">{details?.branch?.nameEn}</p>
        </div>

        <div>
          <p className="text-red-700 font-medium">Role</p>
          <p className="text-gray-600">{details?.role?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
