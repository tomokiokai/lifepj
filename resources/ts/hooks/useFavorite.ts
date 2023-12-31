import { useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { loginUserState } from '../store/userState';
import { useMessage } from "./useMessage";

export const useFavorite = () => {
  const { showMessage } = useMessage();
  const user = useRecoilValue(loginUserState);

  const favoriteShop = useCallback(async (shopId: number) => {
  return axios
    .post("http://localhost:80/api/favorites", { shopId, userId: user?.id })
    .then(() => {
      showMessage({ title: "ショップをお気に入りに追加しました", status: "success" });
    })
    .catch(() => {
      showMessage({ title: "お気に入りの追加に失敗しました", status: "error" });
      throw new Error("Failed to add favorite"); // エラーを投げる
    });
}, [showMessage, user?.id]);

const unfavoriteShop = useCallback(async (shopId: number) => {
  return axios
    .delete(`http://localhost:80/api/favorites/${shopId}`, { data: { userId: user?.id } }) // DELETEリクエストを使用
    .then(() => {
      showMessage({ title: "ショップをお気に入りから削除しました", status: "success" });
    })
    .catch(() => {
      showMessage({ title: "お気に入りの削除に失敗しました", status: "error" });
      throw new Error("Failed to remove favorite"); // エラーを投げる
    });
}, [showMessage, user?.id]);

    const checkFavorite = useCallback(async (shopId: number) => {
    try {
      const res = await axios.get(`http://localhost:80/api/favorites/${shopId}`, { params: { userId: user?.id } });
      return res.data.isFavorite; // Assuming the API returns { isFavorite: boolean }
    } catch {
      return false;
    }
  }, [user?.id]);

  return { favoriteShop, unfavoriteShop, checkFavorite }; // unfavoriteShopも返す
};

