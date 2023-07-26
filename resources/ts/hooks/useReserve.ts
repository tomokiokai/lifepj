// hooks/useReserve.ts
import axios from 'axios';
import { useCallback } from 'react';
import { useRecoilValue } from 'recoil'; // <-- import this
import { loginUserState } from '../store/userState'; // <-- import this
import { useMessage } from './useMessage';
import { ServiceType } from '../types/api/serviceType';

export const useReserve = () => {
  const { showMessage } = useMessage();
  const loginUser = useRecoilValue(loginUserState); // <-- get the user data from the global state

  const handleReserve = useCallback(async (shopId: number, reserveDate: Date | null, time: Date | null, adults: number, children: number, serviceTypeAdult: ServiceType | null, serviceTypeChildren: ServiceType | null) => {
    if (reserveDate && time && serviceTypeAdult && serviceTypeChildren && loginUser) {
      const year = reserveDate.getFullYear();
      const month = reserveDate.getMonth();
      const day = reserveDate.getDate();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const datetime = new Date(year, month, day, hours, minutes);
      
      const datetimeString = `${datetime.getFullYear()}-${("0" + (datetime.getMonth() + 1)).slice(-2)}-${("0" + datetime.getDate()).slice(-2)} ${("0" + datetime.getHours()).slice(-2)}:${("0" + datetime.getMinutes()).slice(-2)}:${("0" + datetime.getSeconds()).slice(-2)}`;

      const timeSlot = (hours - 10) * 2 + (minutes >= 30 ? 1 : 0);

      try {
        const response = await axios.post('http://localhost:80/api/reservations', {
      shop_id: shopId,
      user_id: loginUser.id,
      date: datetimeString,
      time_slot: timeSlot,
      adults: adults,
      children: children,
      service_type_adult: serviceTypeAdult.id,
      service_type_children: serviceTypeChildren.id
    });
        
        if (response.status === 200) {
          showMessage({ title: "予約が成功しました。", status: "success" });
        } else {
          showMessage({ title: "予約に失敗しました。", status: "error" });
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage({ title: "予約に失敗しました。", status: "error" });
      }
    } else {
      showMessage({ title: "日付または時間が設定されていません。", status: "error" });
    }
  }, [showMessage, loginUser,]);

  return { handleReserve };
};
