import { useCallback, useState } from "react";
import axios from "axios";
import { ServiceType } from "../types/api/serviceType"; // Please create this type according to your needs
import { useMessage } from "./useMessage";

export const useServiceTypes = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<Array<ServiceType>>([]);

  const getServiceTypes = useCallback(() => {
    setLoading(true);
    axios
      .get<{ service_types: ServiceType[] }>("http://localhost:80/api/service_types")
      .then((res) => setServiceTypes(res.data.service_types))
      .catch(() => {
        showMessage({ title: "サービスタイプ取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showMessage]);

  return { getServiceTypes, loading, serviceTypes };
};
