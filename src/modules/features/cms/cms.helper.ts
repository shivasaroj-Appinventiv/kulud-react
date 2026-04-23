import { useLocation, useNavigate } from "react-router-dom";
import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import { ROUTES } from "@/routes/RouteConstant";

const useCMSHelper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbs: BreadCrumbType[] = [
    { title: "Static Content Management", path: ROUTES.CMS },
  ];

  const tabs = [
    { label: "About Us", value: "about-us" },
    { label: "Privacy Policy", value: "privacy-policy" },
    { label: "Terms & Conditions", value: "terms" },
  ];

  // find active tab from URL
  console.log(location);
  
  const currentTab =
    tabs.find((tab) => location.pathname.includes(tab.value))?.value ||
    "about-us";

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(`/cms/${newValue}`);
  };
  return { breadcrumbs, currentTab, tabs, handleChange };
};
export default useCMSHelper;
