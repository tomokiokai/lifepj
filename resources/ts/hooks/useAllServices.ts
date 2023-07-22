import { useCallback, useState } from "react";
import axios from "axios";
import { Service } from "../types/api/service";
import { useMessage } from "./useMessage";

export const useAllServices = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Array<Service>>([]);

  const getServices = useCallback(() => {
    setLoading(true);
    axios
      .get<{ services: Service[] }>("http://localhost:80/api/services")
      .then((res) => setServices(res.data.services))
      .catch(() => {
        showMessage({ title: "サービス取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showMessage]);

  return { getServices, loading, services };
};
