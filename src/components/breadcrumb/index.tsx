import { Link } from "react-router-dom";
import type { BreadCrumbType } from "./breadcrumb.helper";
import { Breadcrumbs, Typography } from "@mui/material";

const Breadcrumb = ({ breadCrumbs }: { breadCrumbs: BreadCrumbType[] }) => {
  const lengthOfBreadcrumbs = breadCrumbs.length;

  return (
    <div className="mb-4">
      <Breadcrumbs separator=">" are-label="breadcrumb">
        {breadCrumbs.map((breadcrumb: BreadCrumbType, idx: number) => {
          const isLast = idx == lengthOfBreadcrumbs - 1;

          return isLast ? (
            <Typography key={idx}
            className="text-gray-500 font-medium"
            >{breadcrumb.title}</Typography>
          ) : (
            <Link key={idx} to={breadcrumb.path} className="text-blue-500 hover:underline text-sm">
              {breadcrumb.title}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
