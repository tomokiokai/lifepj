import { useCallback, useState } from "react";
import { Shop } from "../types/api/shop";
import { Reservation } from "../types/api/reservation";

type Props = {
  id: number;
  shops: Array<Shop | Reservation>;
  onOpen: () => void;
}

export const useSelectShop = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const onSelectShop = useCallback((props: Props) => {
  const { id, shops, onOpen } = props;
  const targetShop = shops.find((shop) => shop.id === id);
  
  if (targetShop) {
    if ("reservation_time" in targetShop) {
      setSelectedReservation(targetShop as Reservation);
    } else {
      setSelectedShop(targetShop as Shop);
    }
    onOpen();
  }
}, []);


  return { onSelectShop, selectedShop, selectedReservation };
}
