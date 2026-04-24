import {
  Card,
  Chip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import useRoleDetailsHelper from "./role-details.helper";
import Breadcrumb from "@/components/breadcrumb";

const RoleDetails = () => {
  const { roleDetails, permissions, breadcrumbs, onStatusUpdate } =
    useRoleDetailsHelper();

  return (
    <>
      <div className="flex justify-between align-center mb-4">
        <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            onClick={() => roleDetails && onStatusUpdate(roleDetails)}
            className={`
    !normal-case !font-medium !px-5 !py-2 !rounded-lg
    ${
      roleDetails?.status === "ACTIVE"
        ? "!border-red-500 !text-red-600 hover:!bg-red-50"
        : "!border-green-500 !text-green-600 hover:!bg-green-50"
    }
  `}
          >
            {roleDetails?.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </Button>
        </div>
      </div>
      <Card className="p-6 rounded-2xl shadow-md">
        {/* HEADER */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-red-700 font-medium">Role Name</p>
            <p className="text-gray-700">{roleDetails?.name}</p>
          </div>

          <div>
            <p className="text-red-700 font-medium">Status</p>
            <Chip
              label={roleDetails?.status}
              color={roleDetails?.status === "ACTIVE" ? "success" : "default"}
              className="mt-1"
            />
          </div>

          <div>
            <p className="text-red-700 font-medium">No. of Users</p>
            <p className="text-gray-700">{roleDetails?.totalUsers}</p>
          </div>

          <div>
            <p className="text-red-700 font-medium">Created On</p>
            <p className="text-gray-700">
              {new Date(roleDetails?.createdAt || "").toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div>
          <h3 className="font-semibold mb-3">Permissions</h3>

          <div className="border rounded-xl overflow-hidden">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell>Module</TableCell>
                  <TableCell align="center">View</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {permissions.map((perm: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="capitalize">
                      {perm.module.replaceAll("_", " ")}
                    </TableCell>

                    <TableCell align="center">
                      <Checkbox checked={perm.view} disabled />
                    </TableCell>

                    <TableCell align="center">
                      <Checkbox checked={perm.edit} disabled />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </>
  );
};

export default RoleDetails;
