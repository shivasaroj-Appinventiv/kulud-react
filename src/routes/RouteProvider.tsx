import { Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "./RoutesConfig";
import PageLayout from "../layouts/PageLayout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import WildCardRoute from "../modules/WildCardRoute";

const AppRouter = () => {
  return (
    <Routes>
      {PAGE_ROUTES.map((route) => {
        const LayoutWrapper = route.Layout ? route.Layout : PageLayout;
        const RouteWrapper = route.isPrivate ? PrivateRoute : PublicRoute;
        return (
          <Route
            key={route?.id}
            path={route.path}
            element={
              <RouteWrapper hideAfterLogin={route?.hideAfterLogin}>
                <LayoutWrapper {...(route.name ? { name: route.name } : {})}>
                  <route.component {...route.pageProp} />
                </LayoutWrapper>
              </RouteWrapper>
            }
          ></Route>
        );
      })}
      <Route path="*" element={<WildCardRoute/>}>
        
      </Route>
    </Routes>
  );
};

export default AppRouter;
