import React, {  } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { DashboardPage } from "./page/Dashboard";
import { Home } from "./page/Home";
import { Barras } from "./page/Barras";
import { GeradorPage } from "./page/Geradores";
import { TransformadorPage } from "./page/Transformadores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/barras",
    element: <Barras />,
  },
  {
    path: "/geradores",
    element: <GeradorPage />,
  },
  {
    path: "/transformadores",
    element: <TransformadorPage />,
  }
]);

export function RouterProviders(){
  return(
    <RouterProvider router={router} />
  )
}