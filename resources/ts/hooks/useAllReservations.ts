import { useCallback, useState } from "react"
import axios from "axios"
import { Reservation } from "../types/api/reservation"  // Reservation型をインポートする
import { useMessage } from "./useMessage"

export const useAllReservations = () => {
  const { showMessage } = useMessage()

  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Array<Reservation>>([]); // Reservationsを管理するStateを作成

  const getReservations = useCallback(() => {
    setLoading(true)
    axios
      .get<{ reservations: Reservation[] }>("http://localhost:80/api/reservations")  // APIエンドポイントを変更
      .then((res) => setReservations(res.data.reservations))  // レスポンスのセットを変更
      .catch(() => {
        showMessage({ title: "予約情報取得に失敗しました", status: "error" })  // エラーメッセージを変更
      }).finally(() => {
        setLoading(false)
      });
}, [showMessage]);
  
  return { getReservations, loading, reservations } // 戻り値の名前を変更
}
