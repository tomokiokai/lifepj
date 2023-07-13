import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { loginUserState } from '../store/userState';
import { useMessage } from "./useMessage";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const setLoginUser = useSetRecoilState(loginUserState);
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);

      try {
        const response = await axios.post("/api/login", { email, password }, { headers: { "Cache-Control": "no-cache" } });
        const { token, user } = response.data;

        localStorage.setItem("token", token);

        // ユーザー情報をRecoil stateに保存
        setLoginUser(user);

        // ユーザー情報をローカルストレージにも保存
        localStorage.setItem("loginUser", JSON.stringify(user));

        showMessage({ title: "ログインしました", status: "success" });

        console.log(user);

        navigate("/home");

        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem("expirationTime", expirationTime.toString());
      } catch (error) {
        showMessage({ title: "ログインできません", status: "error" });
      } finally {
        setLoading(false);
      }
    },
    [showMessage, setLoginUser, navigate]
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await axios.post("/api/logout");

      // ローカルストレージからユーザー情報を削除
      localStorage.removeItem("loginUser");

      localStorage.removeItem("token");
      
      setLoginUser(null);

      showMessage({ title: "ログアウトしました", status: "success" });

      navigate("/");
    } catch (error) {
      showMessage({ title: "ログアウトできませんでした", status: "error" });
    } finally {
      setLoading(false);
    }
  }, [showMessage, setLoginUser, navigate]);

  return { login, logout, loading };
};
