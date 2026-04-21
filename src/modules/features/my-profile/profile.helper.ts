import type { BreadCrumbType } from "../../../components/breadcrumb/breadcrumb.helper";
import { useAppSelector, type RootState } from "../../../redux/store";
import { ROUTES } from "../../../routes/RouteConstant";

const useMyProfileHelper = () => {
  const userData = useAppSelector((state: RootState) => state.auth.admin);
  const breadcrumbs: BreadCrumbType[] = [
    { title: "Profile", path: ROUTES.PROFILE },
  ];
  return { userData, breadcrumbs };
};

export default useMyProfileHelper;
