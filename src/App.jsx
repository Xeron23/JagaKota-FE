import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./utils/PrivateRoute.jsx";
// import { useAuth } from "./context/Auth.jsx";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Spinner from "./components/Loader.jsx";
import NotFound from "./pages/notFound.jsx";
import HomePage from "@/pages/Home/index.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";
import ReportPage from "./pages/Report/index.jsx";
import UploadReportPage from "./pages/UploadReport/index.jsx";

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
