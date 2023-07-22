import { useCallback, useState } from "react";
import axios from "axios";
import { ServicePrice } from "../types/api/servicePrice";  
import { useMessage } from "./useMessage";

export const useServicePrices = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [servicePrices, setServicePrices] = useState<Array<ServicePrice>>([]);

  const getServicePrices = useCallback(() => {
    setLoading(true);
    axios
      .get<{ service_prices: ServicePrice[] }>("http://localhost:80/api/service_prices")
      .then((res) => {
    console.log(res.data.service_prices);  // 追加
    setServicePrices(res.data.service_prices);
  })
      .catch(() => {
        showMessage({ title: "サービス価格取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showMessage]);

  return { getServicePrices, loading, servicePrices };
};
