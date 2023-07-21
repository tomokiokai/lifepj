import { useCallback, useState } from "react"
import axios from "axios"
import { Shop } from "../types/api/shop"
import { useMessage } from "./useMessage"

export const useAllShops = () => {
  const { showMessage } = useMessage()

  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState<Array<Shop>>([]);

  const getShops = useCallback(() => {
    setLoading(true)
    axios
      .get<{ shops: Shop[] }>("http://localhost:80/api/shops") // APIエンドポイントを変更
      .then((res) => setShops(res.data.shops)) // レスポンスのセットを変更
      .catch(() => {
        showMessage({ title: "ショップ取得に失敗しました", status: "error" }) // エラーメッセージを変更
      }).finally(() => {
        setLoading(false)
      });
}, [showMessage]);
  
  return { getShops, loading, shops } // 戻り値の名前を変更
}
