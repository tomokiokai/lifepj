import { useCallback, useState } from "react";
import axios from "axios";
import { Shop } from "../types/api/shop";
import { useMessage } from "./useMessage";

export const useFavoriteShops = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<Array<Shop>>([]);

  const getFavoriteShops = useCallback(() => {
    setLoading(true);
    axios
      .get<{ shops: Shop[] }>("http://localhost:80/api/favorites") // APIエンドポイントを変更
      .then((res) => setShops(res.data.shops))
      .catch(() => {
        showMessage({ title: "お気に入りの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showMessage]);

  return { getFavoriteShops, loading, shops };
};
