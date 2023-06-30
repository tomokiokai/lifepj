import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

export const useRegister = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const register = useCallback((id: string) => {
    setLoading(true);

    // ユーザーの新規登録処理を行うAPIのエンドポイントに置き換える
    axios.post<User>(`https://api.example.com/register`, { id }).then((res) => {
      if (res.data) {
        showMessage({ title: "新規登録が完了しました", status: "success" });
        navigate("/login");
      } else {
        showMessage({ title: "新規登録に失敗しました", status: "error" });
        setLoading(false);
      }
    }).catch(() => {
      showMessage({ title: "新規登録に失敗しました", status: "error" });
      setLoading(false);
    });
  }, [navigate, showMessage]);

  return { register, loading };
};
