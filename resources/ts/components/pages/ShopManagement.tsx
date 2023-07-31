import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { Center, Spinner, Wrap, WrapItem, useDisclosure, Box, Input, Flex } from "@chakra-ui/react";

import { ShopCard } from "../organisms/shop/ShopCard";
import { useAllShops } from "../../hooks/useAllShops";
import { ShopDetailModal } from "../organisms/shop/ShopDetailModal";
import { useSelectShop } from "../../hooks/useSelectShop";

export const ShopManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getShops, loading, shops } = useAllShops();
  const { onSelectShop, selectedShop } = useSelectShop();
  
  const [searchQuery, setSearchQuery] = useState(""); // 追加

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
  
  const filteredShops = useMemo(() => {
    if (!searchQuery) return shopsWithRandomImage;
    
    return shopsWithRandomImage.filter((shop) =>
      shop.name.includes(searchQuery) ||
      shop.genre.includes(searchQuery) ||
      shop.area.includes(searchQuery) ||
      shop.address.includes(searchQuery) 
    );
  }, [shopsWithRandomImage, searchQuery]);

  return (
  <>
    {loading ? (
      <Center h="100vh">
        <Spinner />
      </Center>
    ) : (
      <Box>
        <Flex 
          justify="flex-end" 
          position="fixed" 
          right="50px" 
          top="100px"  
          zIndex="10" 
        >
          <Input
            placeholder="Search"
            _placeholder={{ color: 'black' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="300px"  
            borderColor="black"
            borderWidth="2px"    
          />
        </Flex>
        <Wrap mt="30px" p={{ base: 4, md: 10 }}>
          {filteredShops.map((shop) => (
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
      </Box>
    )}
    <ShopDetailModal shop={selectedShop} isOpen={isOpen} onClose={onClose} />
  </>
);

});

