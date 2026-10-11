import { createBrowserRouter, RouterProvider } from "react-router";
import PublicProtected from "./protected/PublicProtected";
import PublicLayout from "../layout/PublicLayout";
import LandingPage from "../../features/Landing/ui/pages/LandingPage";
import PujaDetailPage from "../../features/Landing/ui/pages/PujaDetailPage";
import BookingPage from "../../features/Booking/ui/pages/BookingPage";
import BookingSuccessPage from "../../features/Booking/ui/pages/BookingSuccessPage";
import PujasPage from "../../features/Pujas/ui/pages/PujasPage";
import AstrologyPage from "../../features/Astrology/ui/pages/AstrologyPage";
import SamagriPage from "../../features/Samagri/ui/pages/SamagriPage";
import CustomersPage from "../../features/Customers/ui/pages/CustomersPage";
import AdminPage from "../../features/Admin/ui/pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicProtected />,
    children: [
      {
        path: "",
        element: <PublicLayout />,
        children: [
          {
            path: "",
            element: <LandingPage />,
          },
          {
            path: "puja/:id",
            element: <PujaDetailPage />,
          },
          {
            path: "book",
            element: <BookingPage />,
          },
          {
            path: "booking-success",
            element: <BookingSuccessPage />,
          },
          {
            path: "pujas",
            element: <PujasPage />,
          },
          {
            path: "astrology",
            element: <AstrologyPage />,
          },
          {
            path: "samagri",
            element: <SamagriPage />,
          },
          {
            path: "customers",
            element: <CustomersPage />,
          },
          {
            path: "admin",
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
