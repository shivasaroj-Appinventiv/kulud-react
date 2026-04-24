import Breadcrumb from "@/components/breadcrumb";
import useAddEditRoleHelper from "./add-edit-role.helper";

const AddEditRole = () => {
  const { breadcrumbs } = useAddEditRoleHelper();
  return (
    <>
      <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>


      
    </>
  );
};

export default AddEditRole;
