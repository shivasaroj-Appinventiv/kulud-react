import Breadcrumb from "../../../../components/breadcrumb";
import CommonTableComponent from "../../../../components/common-table/CommonTableComponent";
import { useUserListHelper } from "./userListHelper";
import UserFilter from "../user-filter";
import { useState } from "react";
const userList = () => {
  const {
    usersList,
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
    isLoading
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
        <span
          className={`${row.status == "ACTIVE" ? "text-green-600" : "text-gray-600 bg-gray-100"}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "",
      render: (row: any) => (
        <button
          className="cursor-pointer text-blue-500"
          onClick={() => onEdit(row)}
        >
          Edit
        </button>
      ),
    },
  ];
  
  return (
    <>
      <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
      <CommonTableComponent
        searchPlaceHolder="Search by name"
        loading={isLoading}
        columns={columns}
        totalDocs={totalDocs}
        data={usersList}
        pageSize={10}
        pageOptions={pageOptions}
        handlePageOptionsChanged={handlePageOptionsChanged}
        onRowClick={(row) => {}}
        onToggleFilter={handleToggleFilter}
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
