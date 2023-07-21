import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { Center, Spinner, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";

import { ShopCard } from "../organisms/shop/ShopCard";
import { useAllShops } from "../../hooks/useAllShops";
import { ShopDetailModal } from "../organisms/shop/ShopDetailModal";
import { useSelectShop } from "../../hooks/useSelectShop";

export const ShopManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getShops, loading, shops } = useAllShops();
  const { onSelectShop, selectedShop } = useSelectShop();

  useEffect(() => {
    getShops();
  }, []);

  const onClickShop = useCallback((id: number) => {
    onSelectShop({ id, shops, onOpen })
  }, [onSelectShop, shops, onOpen]);

  const getRandomImageUrl = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `http://unsplash.it/500/300?random=${randomNum}`;
  }, []);

  const shopsWithRandomImage = useMemo(
    () =>
      shops.map((shop) => ({
        ...shop,
        imageUrl: getRandomImageUrl(),
      })),
    [shops, getRandomImageUrl]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {shopsWithRandomImage.map((shop) => (
            <WrapItem key={shop.id} mx="auto">
              <ShopCard
                id={shop.id}
                imageUrl={shop.imageUrl}
                shopName={shop.name}
                description={shop.description}
                area={shop.area}
                address={shop.address}
                genre={shop.genre}
                onClick={onClickShop}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <ShopDetailModal shop={selectedShop} isOpen={isOpen} onClose={onClose} />
    </>
  );
});
