import { FC, memo } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import { Login } from "../components/pages/Login";
import { Register } from "../components/pages/Register";
import { homeRoutes } from "./HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router: FC = memo(() => {
  const token = localStorage.getItem("token"); // ユーザーのトークンなどを取得する処理

  return (
    <LoginUserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {token ? (
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
          <Route path="/home/*" element={<Navigate to="/" replace />} /> // ユーザーがログインしていない場合はルートをリダイレクト
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </LoginUserProvider>
  );
});
