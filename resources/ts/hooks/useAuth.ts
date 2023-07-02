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

  const login = useCallback(({ email, password }: { email: string, password: string }) => {
    setLoading(true);

    axios
      .post("/api/login", { email, password })
      .then((response) => {
        const { data } = response;
        if (data.user) {
          setLoginUser(data.user);
          showMessage({ title: "ログインしました", status: "success" });
          navigate("/home");
          console.log("setLoginUser:", data.user);
        } else {
          showMessage({ title: "ユーザーが見つかりません", status: "error" });
          setLoading(false);
        }
      })
      .catch(() => {
        showMessage({ title: "ログインできません", status: "error" });
        setLoading(false);
      });
  }, [navigate, showMessage, setLoginUser]);

  const logout = useCallback(() => {
    setLoading(true);

    axios
      .post("/api/logout")
      .then(() => {
        setLoginUser(null);
        showMessage({ title: "ログアウトしました", status: "success" });
        setLoading(false);
        navigate("/"); // ログアウト後のリダイレクト先を指定
        console.log("setLoginUser:", null);
      })
      .catch(() => {
        showMessage({ title: "ログアウトできません", status: "error" });
        setLoading(false);
      });
  }, [navigate, setLoginUser, showMessage]);

  return { login, logout, loading };
};
