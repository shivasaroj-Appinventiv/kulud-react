import CommonTableComponent from "../../../../components/common-table/CommonTableComponent";
import { ROUTES } from "../../../../routes/RouteConstant";
import { useOrganizationListHelper } from "./organization-list.helper";
const OrganizationList = () => {
    const { organizationList, status, totalDocs, pageOptions, handlePageOptionsChanged,navigate } = useOrganizationListHelper();

    const isLoading = status === "loading";
    const columns = [
        { header: "Organization", accessor: "name", render:(row:any)=> <a  className="cursor-pointer text-blue-500" onClick={()=>onDetails(row)}>{row.name} </a> },

        { header: "Location", accessor: "address" },
        { header: "Website", accessor: "website", resolve: (item: { website: { name: string; }; }) => { return item.website ? item.website.name : '-' } },
        { header: "Organization Email", accessor: "email" },
        { header: "Username", accessor: "name" },


        { header: "Created On", accessor: "createdAt", sortable: true, sortKey: 'createdAt' },
        { header: "Status", accessor: "status",render:(row:any)=>(<span className={`${row.status=='Active'?"text-green-600":"text-gray-600 bg-gray-100"}`} >{row.status}</span>) },
        {
            header: "Actions",
            accessor: "",
            render: (row: any) => <button className="cursor-pointer text-blue-500" onClick={()=>onEdit(row)} >Edit</button>,
        },
    ]

    const onEdit=(row:any)=>{
        navigate(ROUTES.EDIT_ORGANIZATION_DETAILS(row._id));
    }   
    const onDetails=(row:any)=>{
        navigate(ROUTES.GET_ORGANIZATION_DETAILS(row._id));
    }

    return (
        <>

            <CommonTableComponent
                searchPlaceHolder="Search by Organization"
                columns={columns}
                totalDocs={totalDocs}
                data={organizationList}
                pageSize={10}
                pageOptions={pageOptions}
                loading={isLoading}
                handlePageOptionsChanged={handlePageOptionsChanged}
                onRowClick={() => undefined}


            />
        </>
    )
}


export default OrganizationList;