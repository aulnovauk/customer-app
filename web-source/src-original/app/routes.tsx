import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Layout } from "./components/Layout";
import { Splash } from "./screens/Splash";
import { Onboarding } from "./screens/Onboarding";
import { GeolocationPermission } from "./screens/GeolocationPermission";
import { NotificationPermission } from "./screens/NotificationPermission";
import { BrandIntro } from "./screens/BrandIntro";
import { Home } from "./screens/Home";
import { SalonDetails } from "./screens/SalonDetails";
import { SalonsList } from "./screens/SalonsList";
import { MapView } from "./screens/MapView";
import { Booking } from "./screens/Booking";
import { Payment } from "./screens/Payment";
import { Confirmation } from "./screens/Confirmation";
import { Profile } from "./screens/Profile";
import { Explore } from "./screens/Explore";
import { Bookings } from "./screens/Bookings";
import { Favorites } from "./screens/Favorites";
import { Events } from "./screens/Events";
import { Shop } from "./screens/Shop";
import { Search } from "./screens/Search";
import { Notifications } from "./screens/Notifications";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/geolocation",
        element: <GeolocationPermission />,
      },
      {
        path: "/notifications-setup",
        element: <NotificationPermission />,
      },
      {
        path: "/brand-intro",
        element: <BrandIntro />,
      },
      {
        path: "/app",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "explore", element: <Explore /> },
          { path: "bookings", element: <Bookings /> },
          { path: "favorites", element: <Favorites /> },
          { path: "events", element: <Events /> },
          { path: "shop", element: <Shop /> },
          { path: "profile", element: <Profile /> },
        ],
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/salon/:id",
        element: <SalonDetails />,
      },
      {
        path: "/salons",
        element: <SalonsList />,
      },
      {
        path: "/booking/:salonId",
        element: <Booking />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
      },
      {
        path: "/map",
        element: <MapView />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
]);