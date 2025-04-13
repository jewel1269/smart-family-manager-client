import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../features/dashboard/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default routes;
