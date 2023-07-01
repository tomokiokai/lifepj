import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useRegister = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const register = useCallback((username: string, password: string, email: string) => {
    setLoading(true);

    axios
      .post<User>("api/register", { // Laravelのエンドポイントに合わせてURLを修正する
        username,
        password,
        email,
      })
      .then((res) => {
        if (res.data) {
          showMessage({ title: "新規登録が完了しました", status: "success" });
          navigate("/");
        } else {
          showMessage({ title: "新規登録に失敗しました", status: "error" });
          setLoading(false);
        }
      })
      .catch(() => {
        showMessage({ title: "新規登録に失敗しました", status: "error" });
        setLoading(false);
      });
  }, [navigate, showMessage]);

  return { register, loading };
};
