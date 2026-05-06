import { Outlet, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./RoutesConfig";
import PageLayout from "../layouts/PageLayout";
import WildCardRoute from "../modules/WildCardRoute";
import type { AppRoute } from "@/types/routeTypes";
import RouteGuard from "../guards/routeGuard";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

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
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => window.location.reload()}
                >
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
                </ErrorBoundary>
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
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
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
              </ErrorBoundary>
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
