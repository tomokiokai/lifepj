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
