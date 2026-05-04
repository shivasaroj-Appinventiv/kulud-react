import { Outlet, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./RoutesConfig";
import PageLayout from "../layouts/PageLayout";
import WildCardRoute from "../modules/WildCardRoute";
import type { AppRoute } from "@/types/routeTypes";
import RouteGuard from "../guards/routeGuard";
import { Suspense } from "react";

const AppRouter = () => {

  return (
    <Routes>
      {APP_ROUTES.map((route: AppRoute, index: number) => {
        const Layout = route.Layout || PageLayout;

        // Route has children (e.g. CMS with nested pages)
        if (route.children?.length) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <RouteGuard
                  module={route?.name}
                  action={route?.action}
                  isPrivate={route.isPrivate}
                  hideAfterLogin={route.hideAfterLogin}
                >
                  <Layout>
                    <Suspense fallback={null}>
                      {route.element ?? <Outlet />}
                    </Suspense>
                  </Layout>
                </RouteGuard>
              }
            >
              {route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={<Suspense fallback={null}>{child.element}</Suspense>}
                />
              ))}
            </Route>
          );
        }

        // Simple flat route
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteGuard
                module={route?.name}
                action={route?.action}
                isPrivate={route.isPrivate}
                hideAfterLogin={route.hideAfterLogin}
              >
                <Layout>
                  <Suspense fallback={null}>{route.element}</Suspense>
                </Layout>
              </RouteGuard>
            }
          />
        );
      })}

      {/* 404 */}
      <Route path="*" element={<WildCardRoute />} />
    </Routes>
  );
};

export default AppRouter;
