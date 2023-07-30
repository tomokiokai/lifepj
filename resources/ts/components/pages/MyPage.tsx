import { FC, memo, useEffect, useCallback, useMemo } from "react";
import { Box, Center, Spinner, SimpleGrid, useDisclosure, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { ShopCard } from "../organisms/shop/ShopCard";
import { useUserReservations } from "../../hooks/useUserReservations"; 
import { useFavoriteShops } from "../../hooks/useFavoriteShops";
import { useSelectShop } from "../../hooks/useSelectShop";
import { ShopDetailModal } from "../organisms/shop/ShopDetailModal";

export const MyPage: FC = memo(() => {
  const { onSelectShop, selectedShop } = useSelectShop();
  const { getUserReservations, loading: loadingReservations, reservations } = useUserReservations(); 
  const { getFavoriteShops, loading: loadingFavorites, shops: favoriteShops } = useFavoriteShops();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getUserReservations(); 
    getFavoriteShops();
  }, []);

  const onClickShop = useCallback((id: number) => {
    const shops = [...reservations, ...favoriteShops];
    onSelectShop({ id, shops, onOpen });
  }, [onSelectShop, onOpen, reservations, favoriteShops]);

  const getRandomImageUrl = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `http://unsplash.it/500/300?random=${randomNum}`;
}, []);

const reservationsWithRandomImage = useMemo(
    () =>
        reservations.map((reservation) => ({
        ...reservation,
        imageUrl: getRandomImageUrl(),
        })),
    [reservations, getRandomImageUrl]
);

const favoriteShopsWithRandomImage = useMemo(
  () =>
    favoriteShops.map((shop) => ({
      ...shop,
      imageUrl: getRandomImageUrl(),
    })),
  [favoriteShops, getRandomImageUrl]
);

  if (loadingReservations || loadingFavorites) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return (
  <Box p={4}>
    <SimpleGrid columns={[1, null, 2]} spacing={10}>
      <Box>
          <Text as="h2" fontSize="xl">My Reservations</Text>
          <Wrap spacing={4}>
            {reservationsWithRandomImage.map((reservation) => {
              const reservationDateTime = new Date(reservation.date);
              const formattedDate = `${reservationDateTime.getUTCFullYear()}-${String(reservationDateTime.getUTCMonth() + 1).padStart(2, '0')}-${String(reservationDateTime.getUTCDate()).padStart(2, '0')} ${String(reservationDateTime.getUTCHours()).padStart(2, '0')}:${String(reservationDateTime.getUTCMinutes()).padStart(2, '0')}`;
              return (
                <WrapItem>
                  <ShopCard
                      key={reservation.shop.id}
                      id={reservation.shop.id}
                      imageUrl={reservation.imageUrl}
                      shopName={reservation.shop.name}
                      description={reservation.shop.description}
                      area={reservation.shop.area}
                      address={reservation.shop.address}
                      genre={reservation.shop.genre}
                      reservationDate={formattedDate} 
                      onClick={onClickShop}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
      </Box>
      <Box>
        <Text as="h2" fontSize="xl">My Favorites</Text>
        <Wrap spacing={4}>
          {favoriteShopsWithRandomImage.map((shop) => (
            <WrapItem>
              <ShopCard
                key={shop.id}
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
    </SimpleGrid>
    <ShopDetailModal shop={selectedShop} isOpen={isOpen} onClose={onClose} />
  </Box>
);
});
