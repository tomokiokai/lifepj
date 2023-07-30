import { useCallback, useState } from "react";
import axios from "axios";
import { Reservation } from "../types/api/reservation";
import { useMessage } from "./useMessage";
import { useRecoilValue } from 'recoil'; // <-- Recoilをインポート
import { loginUserState } from '../store/userState'; // <-- loginUserStateをインポート

export const useUserReservations = () => {
  const { showMessage } = useMessage();
  const user = useRecoilValue(loginUserState); // <-- Recoilからログインユーザー情報を取得

  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Array<Reservation>>([]);

  const getUserReservations = useCallback(() => {
    setLoading(true)
    console.log(user);
    console.log(user?.token);
    axios
      .get<{ reservations: Reservation[] }>(
        'http://localhost:80/api/user_reservations',
        { headers: { Authorization: `Bearer ${user?.token}` } } // <-- Add Authorization header
      )
      .then((res) => setReservations(res.data.reservations))
      .catch(() => {
        showMessage({ title: "予約情報取得に失敗しました", status: "error" });
      }).finally(() => {
        setLoading(false)
      });
  }, [showMessage, user?.token]); // <-- user?.tokenの変更を監視
  
  return { getUserReservations, loading, reservations }
}