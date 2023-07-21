import { useCallback, useState } from "react";
import { Shop } from "../types/api/shop";

type Props = {
  id: number;
  shops: Array<Shop>;
  onOpen: () => void;
}

export const useSelectShop = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const onSelectShop = useCallback((props: Props) => {
    const { id, shops, onOpen } = props;
    const targetShop = shops.find((shop) => shop.id === id);
    setSelectedShop(targetShop ?? null);
    onOpen();
  }, []);

  return { onSelectShop, selectedShop }
}
