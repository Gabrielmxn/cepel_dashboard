import React, { ReactElement, ReactNode } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouterProviderProps,
} from "react-router-dom";
import { Dashboard } from "./page/Dashboard";
import { Home } from "./page/Home";
import { Barras } from "./page/Barras";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/barras",
    element: <Barras />,
  }
]);

export function RouterProviders(){
  return(
    <RouterProvider router={router} />
  )
}