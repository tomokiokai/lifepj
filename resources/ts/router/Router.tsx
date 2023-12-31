import { FC, memo } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { useAuth } from "../hooks/useAuth";

export const Router: FC = memo(() => {
  const { login, loading } = useAuth();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/home" replace />
          ) : (
            <Login login={login} loading={loading} />
          )
        }
      />
      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/home" replace />
          ) : (
            <Register />
          )
        }
      />
      {isLoggedIn ? (
        <Route path="/home">
          {homeRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <HeaderLayout>
                  {route.element}
                </HeaderLayout>
              }
            />
          ))}
        </Route>
      ) : (
        <Route path="/home/*" element={<Navigate to="/" replace />} />
      )}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
