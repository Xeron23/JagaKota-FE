import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import { useAuth } from "./context/Auth.jsx";
import Register from "./pages/auth/register.jsx";
import Login from "./pages/auth/login.jsx";
import Spinner from "./components/Loader.jsx";
import NotFound from "./pages/notFound.jsx";
import HomePage from "@/pages/Home/index.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";

const Dashboard = lazy(() => import("./pages/testDashboard.jsx"));

function App() {
  const { isAuth } = useAuth();

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
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
