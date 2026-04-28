import Breadcrumb from "../../../../components/breadcrumb";
import CommonTableComponent from "../../../../components/common-table/CommonTableComponent";
import { useUserListHelper } from "./userListHelper";
import UserFilter from "../user-filter";
import RowActionMenu from "./RowActionMenu";
import { Button, Chip } from "@mui/material";
const userList = () => {
  const {
    usersLists,
    totalDocs,
    pageOptions,
    handlePageOptionsChanged,
    onEdit,
    onDetails,
    breadcrumbs,
    showFilter,
    handleToggleFilter,
    handleCloseFilter,
    handleApplyFilter,
    isFilterApplied,
    filters,
    isLoading,
    onStatusUpdate,
    handleAddUser
  } = useUserListHelper();
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const columns = [
    {
      header: "User Id",
      accessor: "adminId",
      render: (row: any) => (
        <a
          className="cursor-pointer text-blue-500"
          onClick={() => onDetails(row)}
        >
          {row.adminId}{" "}
        </a>
      ),
    },

    { header: "Name", accessor: "fullName" },
    { header: "Email", accessor: "email" },
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
              width:100,
                backgroundColor:
                row?.status === "ACTIVE" ? "#cfe3d9" : "#f1aaaa",
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
    <div className="flex  justify-between al-center mb-4">
      <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
      <Button onClick={handleAddUser} variant="contained">Add User</Button>
      
    </div>
      <CommonTableComponent
        searchPlaceHolder="Search by name"
        loading={isLoading}
        columns={columns}
        totalDocs={totalDocs}
        data={usersLists}
        pageSize={10}
        pageOptions={pageOptions}
        handlePageOptionsChanged={handlePageOptionsChanged}
        onRowClick={(row) => {}}
        onToggleFilter={handleToggleFilter}
        isFilterApplied={isFilterApplied}

      >
        {showFilter && (
          <UserFilter
            isApplied={isFilterApplied}
            initialValues={filters}
            onApply={handleApplyFilter}
            onClose={handleCloseFilter}
          />
        )}
      </CommonTableComponent>
    </>
  );
};

export default userList;
