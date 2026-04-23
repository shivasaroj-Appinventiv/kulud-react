import Breadcrumb from "@/components/breadcrumb";
import { Tabs, Tab, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import useCMSHelper from "./cms.helper";

const CMS = () => {
  const { breadcrumbs, currentTab, tabs, handleChange } = useCMSHelper();

  return (
    <>
      <Breadcrumb breadCrumbs={breadcrumbs}></Breadcrumb>
      <Box className="p-6 bg-white rounded-2xl shadow-md h-screen">
        <Tabs
          className="border-b-2 border-gray-100 py-2"
          value={currentTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              className="!capitalize !font-medium"
            />
          ))}
        </Tabs>

        {/* Content */}
        <Box className="mt-6 bg-white">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default CMS;
