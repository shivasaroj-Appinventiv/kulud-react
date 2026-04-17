import { useParams } from "react-router-dom";
import { useAppSelector, type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrganizationDetails } from "../organization.slices";

const OrganizationDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { details, status } = useAppSelector(
    (state) => state.organizationManagement,
  );

  useEffect(() => {
    if (id) {
      dispatch(getOrganizationDetails(id));
    }
  }, [id]);

  return <>{status === "loading" ? <h1>Loading</h1> :
    
 <div className="max-w-5xl p-6 bg-white shadow-md rounded-md mt-6">

            <div className="flex item-space-between gap-6 mb-6">
                <div className="w-32 h-32">

                <img src={details?.profilePicture||''} alt="user image" className="w-32 h-32 rounded-full border-2 border-gray-300" />
                </div>
                <button className="">Edit</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <label className="block font-medium" htmlFor="">Name</label>
                    <label className="block font-regular" htmlFor="">{details?.name}</label>
                </div>
                 <div>
                    <label className="block font-medium" htmlFor="">Email</label>
                    <label className="block font-regular" htmlFor="">{details?.email}</label>
                </div>
                 
                
                 <div>
                    <label className="block font-medium" htmlFor="">Address</label>
                    <label className="block font-regular" htmlFor="">{details?.address}</label>
                </div>
                 
            </div>
        </div>




  }</>;
};

export default OrganizationDetails;
