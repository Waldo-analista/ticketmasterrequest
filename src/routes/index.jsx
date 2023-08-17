import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Error404 from "../pages/Error404";
import "../pages/Profile";
import Profile from "../pages/Profile";
import LikeEvents from "../pages/Profile/components/LikeEvents";
import Myinfo from "../pages/Profile/components/MyInfo";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/detail/:eventId",
    element: (
      <Suspense fallback={<div>Cargando ...</div>}>
        <Detail />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "my-info",
        element: <Myinfo />,
      },
      {
        path: "liked-events",
        element: <LikeEvents />,
      },
    ],
  },
]);

const myRoutes = () => <RouterProvider router={router} />;

export default myRoutes;
