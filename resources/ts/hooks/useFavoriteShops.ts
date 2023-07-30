import { useCallback, useState } from "react";
import axios from "axios";
import { Shop } from "../types/api/shop";
import { useMessage } from "./useMessage";
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../store/userState';

export const useFavoriteShops = () => {
  const { showMessage } = useMessage();
  const user = useRecoilValue(loginUserState);
  
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<Array<Shop>>([]);

  const getFavoriteShops = useCallback(() => {
    setLoading(true);
    axios
      .get<{ shops: Shop[] }>(
        `http://localhost:80/api/user_favorites`, // <-- Update endpoint
        { headers: { Authorization: `Bearer ${user?.token}` } } // <-- Add Authorization header
      )
      .then((res) => setShops(res.data.shops))
      .catch(() => {
        showMessage({ title: "お気に入りの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showMessage, user?.token]); // <-- user?.tokenの変更を監視

  return { getFavoriteShops, loading, shops };
};
