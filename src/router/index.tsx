import { createBrowserRouter, RouterProvider } from "react-router";
import { LoanRiskDashboard } from "..";
import AppLayout from "@/layout";
import { CustomerDetails } from "@/customer-details";

const route = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "dashboard", element: <LoanRiskDashboard /> },
      {
        path: "customer/:id",
        element: <CustomerDetails />,
      },
    ],
  },
];

const router = createBrowserRouter(route);
function index() {
  return <RouterProvider router={router} />;
}

export default index;
