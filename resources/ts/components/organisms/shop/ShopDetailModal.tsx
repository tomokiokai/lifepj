import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Stack, } from "@chakra-ui/react";
import { Shop } from "../../../types/api/shop";
import { FC, memo } from "react";
import { ServiceType } from "../../../types/api/serviceType"; 
import { useServiceTypes } from "../../../hooks/useServiceTypes";
import { useServicePrices } from "../../../hooks/useServicePrices";
import { ServicePrice } from "../../../types/api/servicePrice";

type Props = {
  shop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ShopDetailModal: FC<Props> = memo((props) => {
  const { shop, isOpen, onClose } = props;
  const { getServiceTypes, serviceTypes } = useServiceTypes();
  const { getServicePrices, servicePrices } = useServicePrices();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      setIsLoading(true);
      await Promise.all([getServiceTypes(), getServicePrices()]);
      setIsLoading(false);
    };
    fetchServiceData();
  }, [getServiceTypes, getServicePrices]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [serviceTypeAdult, setServiceTypeAdult] = useState<ServiceType | null>(null);
  const [serviceTypeChildren, setServiceTypeChildren] = useState<ServiceType | null>(null);
  const [servicePriceAdult, setServicePriceAdult] = useState<number | null>(null);
  const [servicePriceChildren, setServicePriceChildren] = useState<number | null>(null);
  const [adultTotal, setAdultTotal] = useState(0);
  const [childTotal, setChildTotal] = useState(0);

  useEffect(() => {
    if (serviceTypeAdult) {
      const price = servicePrices.find(price => price.service_type_id === serviceTypeAdult.id);
      if (price) {
        setServicePriceAdult(price.adult_price);
      }
    }
    if (serviceTypeChildren) {
      const price = servicePrices.find(price => price.service_type_id === serviceTypeChildren.id);
      if (price) {
        setServicePriceChildren(price.children_price);
      }
    }
  }, [serviceTypeAdult, serviceTypeChildren, servicePrices]);

  useEffect(() => {
    if (servicePriceAdult) {
      setAdultTotal(adults * servicePriceAdult);
    }
    if (servicePriceChildren) {
      setChildTotal(children * servicePriceChildren);
    }
  }, [adults, children, servicePriceAdult, servicePriceChildren]);

  const handleReserve = () => {
    // Call API to make reservation
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>ショップ詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>予約日</FormLabel>
              <Input value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>時間</FormLabel>
              <Input value={time} onChange={(e) => setTime(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>大人の数</FormLabel>
              <Input value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel>大人のサービスタイプ</FormLabel>
              <Select isDisabled={isLoading} onChange={(e) => setServiceTypeAdult(serviceTypes.find(serviceType => serviceType.id === Number(e.target.value)) || null)}>
                {serviceTypes.map((serviceType) => (
                  <option key={serviceType.id} value={serviceType.id}>
                    {serviceType.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {servicePriceAdult && (
              <FormControl>
                <FormLabel>大人のサービス価格</FormLabel>
                <Input value={servicePriceAdult} readOnly />
              </FormControl>
            )}
            <FormControl>
              <FormLabel>大人の合計</FormLabel>
              <Input value={adultTotal} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>子供の数</FormLabel>
              <Input value={children} onChange={(e) => setChildren(Number(e.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel>子供のサービスタイプ</FormLabel>
              <Select isDisabled={isLoading} onChange={(e) => setServiceTypeChildren(serviceTypes.find(serviceType => serviceType.id === Number(e.target.value)) || null)}>
                {serviceTypes.map((serviceType) => (
                  <option key={serviceType.id} value={serviceType.id}>
                    {serviceType.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {servicePriceChildren && (
              <FormControl>
                <FormLabel>子供のサービス価格</FormLabel>
                <Input value={servicePriceChildren} readOnly />
              </FormControl>
            )}
            <FormControl>
              <FormLabel>子供の合計</FormLabel>
              <Input value={childTotal} readOnly />
            </FormControl>
            <Button onClick={handleReserve}>予約</Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

