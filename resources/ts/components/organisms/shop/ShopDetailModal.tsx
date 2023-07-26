import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Stack, Flex, Grid, Box} from "@chakra-ui/react";
import { Shop } from "../../../types/api/shop";
import { FC, memo } from "react";
import { ServiceType } from "../../../types/api/serviceType"; 
import { useServiceTypes } from "../../../hooks/useServiceTypes";
import { useServicePrices } from "../../../hooks/useServicePrices";
import { ServicePrice } from "../../../types/api/servicePrice";
import { useReserve } from '../../../hooks/useReserve';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const currentDate = new Date();
  const roundedCurrentTime = new Date(Math.ceil(currentDate.getTime() / (1000 * 60 * 30)) * (1000 * 60 * 30));
  
  const [reserveDate, setReserveDate] = useState<Date | null>(currentDate);
  const [time, setTime] = useState<Date | null>(roundedCurrentTime);
  
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [serviceTypeAdult, setServiceTypeAdult] = useState<ServiceType | null>(null);
  const [serviceTypeChildren, setServiceTypeChildren] = useState<ServiceType | null>(null);
  const [servicePriceAdult, setServicePriceAdult] = useState<number | null>(null);
  const [servicePriceChildren, setServicePriceChildren] = useState<number | null>(null);
  const [adultTotal, setAdultTotal] = useState(0);
  const [childTotal, setChildTotal] = useState(0);
  const { handleReserve } = useReserve();
  const [selectedPersonType, setSelectedPersonType] = useState('');

  useEffect(() => {
    const fetchServiceData = async () => {
      setIsLoading(true);
      await Promise.all([getServiceTypes(), getServicePrices()]);
      setIsLoading(false);
    };
    fetchServiceData();
  }, [getServiceTypes, getServicePrices]);
  
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

  return (
  <Modal
  isOpen={isOpen}
  onClose={onClose}
  autoFocus={false}
  motionPreset="slideInBottom"
>
  <ModalOverlay />
  <ModalContent pb={6} maxW="4xl">
    <ModalHeader>ショップ詳細</ModalHeader>
    <ModalCloseButton />
    <ModalBody mx={4}>
      <Stack spacing={6}>
        <FormControl>
  <FormLabel>予約日</FormLabel>
            <DatePicker
              selected={reserveDate}
              onChange={(date) => setReserveDate(date)}
              dateFormat="yyyy/MM/dd"
            />
</FormControl>
         <FormControl>
            <FormLabel>時間</FormLabel>
            <DatePicker
  selected={time}
  onChange={(date) => setTime(date)}
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={30}
  timeCaption="Time"
  dateFormat="h:mm aa"
  minTime={new Date(currentDate.setHours(10,0))}
  maxTime={new Date(currentDate.setHours(20,0))}
/>
          </FormControl>

        <Stack spacing={8}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Box><FormLabel></FormLabel></Box>
            <FormControl>
              <FormLabel>人数</FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>サービスタイプ</FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>サービス価格</FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>合計</FormLabel>
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Box><FormLabel>大人</FormLabel></Box>
            <FormControl>
              <Select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                <option value="0" disabled>0</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Select isDisabled={isLoading} value={serviceTypeAdult?.id || ''} onChange={(e) => setServiceTypeAdult(serviceTypes.find(serviceType => serviceType.id === Number(e.target.value)) || null)}>
                <option value="" disabled>選択してください</option>
                {serviceTypes.map((serviceType) => (
                  <option key={serviceType.id} value={serviceType.id}>
                    {serviceType.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Input value={servicePriceAdult !== null ? servicePriceAdult : ''} readOnly />

            </FormControl>
            <FormControl>
              <Input value={adultTotal} readOnly />
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Box><FormLabel>子供</FormLabel></Box>
            <FormControl>
              <Select value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                <option value="0" disabled>0</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
          </FormControl>
            <FormControl>
              <Select isDisabled={isLoading} value={serviceTypeChildren?.id || ''} onChange={(e) => setServiceTypeChildren(serviceTypes.find(serviceType => serviceType.id === Number(e.target.value)) || null)}>
                <option value="" disabled>選択してください</option>
                {serviceTypes.map((serviceType) => (
                  <option key={serviceType.id} value={serviceType.id}>
                    {serviceType.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Input value={servicePriceChildren !== null ? servicePriceChildren : ''} readOnly />
            </FormControl>
            <FormControl>
              <Input value={childTotal} readOnly />
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Box><FormLabel>合計</FormLabel></Box>
            <Box></Box>
            <Box></Box>
            <Box></Box>
            <FormControl>
              <Input value={adultTotal + childTotal} readOnly />
            </FormControl>
          </Grid>
        </Stack>

         <Button onClick={() => {
  if (shop?.id !== undefined) {
    handleReserve(shop.id, reserveDate, time, adults, children, serviceTypeAdult, serviceTypeChildren)
  } else {
    // Show error message
    console.error("Shop ID is undefined");
  }
}}>予約</Button>



      </Stack>
    </ModalBody>
  </ModalContent>
</Modal>

);
});

