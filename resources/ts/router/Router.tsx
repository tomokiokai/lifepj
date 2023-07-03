import { FC, memo } from "react";
import { Route, Routes, Navigate, useRoutes } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: FC = memo(() => {
  const token = localStorage.getItem("token");

  const routeConfig = [
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/home",
      element: token ? (
        <HeaderLayout>
          <Routes>
            {homeRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </HeaderLayout>
      ) : (
        <Navigate to="/" replace />
      )
    },
    {
      path: "*",
      element: <Page404 />
    }
  ];

  const routing = useRoutes(routeConfig);

  return <LoginUserProvider>{routing}</LoginUserProvider>;
});

export default Router;
