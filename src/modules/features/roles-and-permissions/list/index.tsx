import Breadcrumb from "@/components/breadcrumb";
import useRolesAndPermissionsHelper from "./roles-and-permissions.helper";
import CommonTableComponent from "@/components/common-table/CommonTableComponent";
import RowActionMenu from "./RowActionMenu";
import { Button, Chip } from "@mui/material";

const RolesAndPermissions = () => {
  const {
    roles,
    totalDocs,
    pageOptions,
    handlePageOptionsChanged,
    onEdit,
    onDetails,
    breadcrumbs,
    isLoading,
    onStatusUpdate,
    handleAddRole,
  } = useRolesAndPermissionsHelper();
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const columns = [
    { header: "Role Name", accessor: "name" },

    {
      header: "Members Aligned",
      accessor: "totalUser",
      sortable: true,
      sortKey: "totalUser",
      render: (row: any) => row.totalUser,
    },
    {
      header: "Created On",
      accessor: "createdAt",
      sortable: true,
      sortKey: "createdAt",
      render: (row: any) => formatDate(row.createdAt),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row: any) => (
        <Chip
          label={row?.status === "ACTIVE" ? "Active" : "Inactive"}
          sx={{
            width: 100,
            backgroundColor: row?.status === "ACTIVE" ? "#cfe3d9" : "#f1aaaa",
            color: row?.status === "ACTIVE" ? "green" : "red",
            fontWeight: "bold",
            borderRadius: "20px",
            px: 1.5,
          }}
        />
      ),
    },
    {
      header: "Actions",
      accessor: "",
      render: (row: any) => (
        <RowActionMenu
          row={row}
          onDetails={onDetails}
          onEdit={onEdit}
          onStatusUpdate={onStatusUpdate}
        />
      ),
    },
  ];

  return (
    <>
    <div className="flex justify-between ql-align-center mb-4">
      <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
      <Button 
                                      variant="contained"

      className="" onClick={handleAddRole} >Add Role</Button>
    </div>
      <CommonTableComponent
        searchPlaceHolder="Search by Role Name"
        loading={isLoading}
        columns={columns}
        totalDocs={totalDocs}
        data={roles}
        pageSize={10}
        pageOptions={pageOptions}
        handlePageOptionsChanged={handlePageOptionsChanged}
        onRowClick={() => {}}
        isFilterPresent={false}
      ></CommonTableComponent>
    </>
  );
};

export default RolesAndPermissions;
