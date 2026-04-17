import { useUserDetailsHelper } from "./user.details.helper";


const UserDetails = () => {
  const imagePrefix = import.meta.env.imagePrefix;

    const {details} = useUserDetailsHelper()


  return (
    <div className="bg-white rounded-2xl shadow-md p-6 relative">
      {/* Status Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
          {details?.status}
        </span>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={details&&details?.profilePicture?imagePrefix+details?.profilePicture:''}
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
