import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);

      try {
        const response = await axios.post("/api/login", { email, password });
        const { token, user, expiresIn } = response.data;

        // トークンをLocalStorageに保存
        localStorage.setItem("token", token);

        setLoginUser(user);
        showMessage({ title: "ログインしました", status: "success" });
        navigate("/home");
        console.log("setLoginUser:", user);

        // 有効期限をLocalStorageに保存（ミリ秒単位）
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1時間（ミリ秒単位）
        localStorage.setItem("expirationTime", expirationTime.toString());
      } catch (error) {
        showMessage({ title: "ログインできません", status: "error" });
        setLoading(false);
      }
    },
    [navigate, showMessage, setLoginUser]
  );

  const logout = useCallback(() => {
    setLoading(true);

    // トークンと有効期限をLocalStorageから削除
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    setLoginUser(null);
    showMessage({ title: "ログアウトしました", status: "success" });
    setLoading(false);
    navigate("/"); // ログアウト後のリダイレクト先を指定
    console.log("setLoginUser:", null);
  }, [navigate, setLoginUser, showMessage]);

  return { login, logout, loading };
};

