import CommonTableComponent from "../../../../components/common-table/CommonTableComponent";
import { useUserListHelper } from "./userListHelper";

const userList = ()=>{
        const { usersList, status, totalDocs, pageOptions, handlePageOptionsChanged,navigate } = useUserListHelper();
    const formatDate = (dateString: string) => new Date(dateString).toLocaleString("en-IN", {
                                                                          day: "2-digit",
                                                                          month: "short",
                                                                          year: "numeric",
                                                                          hour: "2-digit",
                                                                          minute: "2-digit",
                                                                        });
     const columns = [
        { header: "User Id", accessor: "adminId", render:(row:any)=> <a  className="cursor-pointer text-blue-500" onClick={()=>onDetails(row)}>{row.adminId} </a> },

        { header: "Name", accessor: "fullName" },
        { header: "Email", accessor: "email" },
        { header: "Created On", accessor: "createdAt", sortable: true, sortKey: 'createdAt',render:(row:any)=>(formatDate(row.createdAt)) },
        { header: "Status", accessor: "status",render:(row:any)=>(<span className={`${row.status=='ACTIVE'?"text-green-600":"text-gray-600 bg-gray-100"}`} >{row.status}</span>) },
        {
            header: "Actions",
            accessor: "",
            render: (row: any) => <button className="cursor-pointer text-blue-500" onClick={()=>onEdit(row)} >Edit</button>,
        },
    ]

        const onEdit=(row:any)=>{
            // navigate(ROUTES.EDIT_ORGANIZATION_DETAILS(row._id));
        }   
        const onDetails=(row:any)=>{
            // navigate(ROUTES.GET_ORGANIZATION_DETAILS(row._id));
        }

    return (
        <>
         <CommonTableComponent
                searchPlaceHolder="Search by name"
                columns={columns}
                totalDocs={totalDocs}
                data={usersList}
                pageSize={10}
                pageOptions={pageOptions}
                loading={false}
                handlePageOptionsChanged={handlePageOptionsChanged}
                onRowClick={(row) => {}}


            />
        </>
    );
}

export default userList;