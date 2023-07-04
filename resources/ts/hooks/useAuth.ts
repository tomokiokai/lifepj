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
      const response = await axios.post("/api/login", { email, password }, { headers: { "Cache-Control": "no-cache" } });
      const { token, user } = response.data;

      localStorage.setItem("token", token);

      await new Promise((resolve) => {
        setLoginUser(() => {
          showMessage({ title: "ログインしました", status: "success" });
          resolve(user);
          return user;
        });
      });

      console.log(user); // ユーザーデータのログ出力

      // ユーザー情報が更新された後に遷移
      navigate("/home");
      
      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
    } catch (error) {
      showMessage({ title: "ログインできません", status: "error" });
      setLoading(false);
    }
  },
  [navigate, showMessage, setLoginUser]
);


  const logout = useCallback(async () => {
  setLoading(true);

  try {
    // サーバーにログアウトリクエストを送信し、セッションを無効化する
    await axios.post("/api/logout");

    // ローカルストレージのトークンと有効期限を削除
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    // ユーザー情報をnullにリセット
    setLoginUser(null);

    showMessage({ title: "ログアウトしました", status: "success" });
    setLoading(false);
    navigate("/"); // ログアウト後のリダイレクト先を指定
    console.log("setLoginUser:", null);
  } catch (error) {
    showMessage({ title: "ログアウトできませんでした", status: "error" });
    setLoading(false);
  }
}, [navigate, setLoginUser, showMessage]);

  return { login, logout, loading };
};

