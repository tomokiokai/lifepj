import { useState,useEffect } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Stack, } from "@chakra-ui/react";
import { Shop } from "../../../types/api/shop";
import { FC, memo } from "react";
import { Service } from "../../../types/api/service"; 
import { useAllServices } from "../../../hooks/useAllServices";

type Props = {
  shop: Shop | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ShopDetailModal: FC<Props> = memo((props) => {
  const { shop, isOpen, onClose } = props;
  const { getServices, services } = useAllServices();

  useEffect(() => {
    getServices(); // 初期読み込み時にサービスを取得する
  }, [getServices]);

  const [date, setDate] = useState("");  // State for reservation date
  const [time, setTime] = useState("");  // State for reservation time
  const [adults, setAdults] = useState(0);  // State for number of adults
  const [children, setChildren] = useState(0);  // State for number of children
  const [service, setService] = useState<number | null>(null);  // State for selected service
  const [quantity, setQuantity] = useState(0);  // State for quantity of service

  // This function should make an API call to submit the reservation
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
            {/* Existing form fields... */}
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
              <FormLabel>子供の数</FormLabel>
              <Input value={children} onChange={(e) => setChildren(Number(e.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel>サービス</FormLabel>
              <Select onChange={(e) => setService(Number(e.target.value))}>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>サービスの数</FormLabel>
              <Input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </FormControl>
            <Button onClick={handleReserve}>予約</Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

