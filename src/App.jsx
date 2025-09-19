import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute.jsx";
// import { useAuth } from "./context/Auth.jsx";
import Register from "./pages/auth/register.jsx";
import Login from "./pages/auth/login.jsx";
import Spinner from "./components/Loader.jsx";
import NotFound from "./pages/notFound.jsx";
import HomePage from "@/pages/Home/index.jsx";
import ReportDetail from "./pages/ReportDetail/index.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import ReportPage from "./pages/Report/index.jsx";
import UploadReportPage from "./pages/UploadReport/index.jsx";
import AdminAccess from "./utils/AdminRouteAccess.jsx";
import Reports from "./pages/admin/Report.jsx";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

const Dashboard = lazy(() => import("./pages/testDashboard.jsx"));

function App() {
  // const { isAuth } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/laporan",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <ReportPage />,
        },
      ],
    },
    {
      path: "/laporan/:id",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <ReportDetail />,
        },
      ],
    },

    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/dashboard",
          element: (
            <Suspense fallback={<Spinner />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "/laporan/upload",
          element: <PublicLayout />,
          children: [{ index: true, element: <UploadReportPage /> }],
        },
      ],
    },
    {
      element: <PrivateRoute />,
      children: [
        {
          element: <AdminAccess />,
          children: [
            {
              path: "/admin/dashboard",
              element: (
                <Suspense fallback={<Spinner />}>
                  <AdminLayout>
                    <DashboardAdmin />
                  </AdminLayout>
                </Suspense>
              ),
            },
            {
              path: "/admin/reports",
              element: (
                <Suspense fallback={<Spinner />}>
                  <AdminLayout>
                    <Reports />
                  </AdminLayout>
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
          },
          success: {
            style: {
              background: "#10b981",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
