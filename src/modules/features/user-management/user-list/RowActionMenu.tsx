import { Button, Menu, MenuItem } from "@mui/material";
import { EllipsisVertical } from "lucide-react";
import { STATUS_TYPE_VALUE } from "../../../../constants/constant";
import React from "react";
import type { User } from "../user-management.interfaces";

// Separate component so each row gets its own isolated state
const RowActionMenu = ({
  row,
  onDetails,
  onEdit,
  onStatusUpdate,
}: {
  row: any;
  onDetails: (row: User) => void;
  onEdit: (row: User) => void;
  onStatusUpdate: (row: User) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // ✅ prevent row click firing
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button onClick={handleClick}>
        <EllipsisVertical />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onDetails(row);
            handleClose();
          }}
        >
          Details
        </MenuItem>
        <MenuItem disabled={row.status === STATUS_TYPE_VALUE.INACTIVE}
          onClick={() => {
            onEdit(row);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onStatusUpdate(row);
            handleClose();
          }}
        >
          {row.status === STATUS_TYPE_VALUE.ACTIVE ? "Deactivate" : "Activate"}{" "}
          {/* ✅ fixed label logic too */}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default RowActionMenu;
