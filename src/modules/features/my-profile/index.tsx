import Breadcrumb from "../../../components/breadcrumb";
import useMyProfileHelper from "./profile.helper";

const MyProfile = () => {
  const { userData, breadcrumbs } = useMyProfileHelper();
  const VITE_IMAGE_PREFIX = import.meta.env.VITE_IMAGE_PREFIX;

  return (
    <>
        <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
    <div className="w-full p-6 bg-white shadow-md rounded-md mt-6">
      <div className="flex item-space-between gap-6 mb-6">
        <div className="w-32 h-32">
          <img
            src={ userData?.profilePicture? VITE_IMAGE_PREFIX + userData?.profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="user image"
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
        </div>
        {/* <button className="">Edit</button> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium" htmlFor="">
            Name
          </label>
          <label className="block font-regular" htmlFor="">
            {userData.fullName}
          </label>
        </div>
        <div>
          <label className="block font-medium" htmlFor="">
            Email
          </label>
          <label className="block font-regular" htmlFor="">
            {userData.email}
          </label>
        </div>
        <div>
          <label className="block font-medium" htmlFor="">
            User Type
          </label>
          <label className="block font-regular" htmlFor="">
            {userData.userType}
          </label>
        </div>
        <div>
          <label className="block font-medium" htmlFor="">
            Phone Number
          </label>
          <label className="block font-regular" htmlFor="">
            {userData.phone}
          </label>
        </div>

        <div>
          <label className="block font-medium" htmlFor="">
            Status
          </label>
          <label className="block font-regular" htmlFor="">
            {userData.status}
          </label>
        </div>
      </div>
    </div>
    </>
  );
};

export default MyProfile;
