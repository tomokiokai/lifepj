import { Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { FC, memo, useEffect, useState } from "react";
import { useFavorite } from '../../../hooks/useFavorite';

type Props = {
  id: number;
  imageUrl: string;
  shopName: string;
  description: string;
  area: string;
  address: string;
  genre: string;
  reservationDate?: string;
  onClick: (id: number) => void;
};

export const ShopCard: FC<Props> = memo((props) => {
  const {
    id,
    imageUrl,
    shopName,
    description,
    area,
    address,
    genre,
    reservationDate,
    onClick,
  } = props;

  const [cardHeight, setCardHeight] = useState('380px'); 

  useEffect(() => {
    if (reservationDate) {
      setCardHeight('420px'); // 予約時間が存在する場合、カードの高さを増やす
    } else {
      setCardHeight('380px'); // 予約時間が存在しない場合、元の高さを保つ
    }
  }, [reservationDate]);

  const [isFavorited, setIsFavorited] = useState(false);
  
  const { favoriteShop, unfavoriteShop, checkFavorite } = useFavorite(); 

  useEffect(() => {
    checkFavorite(id)
      .then((favorited) => {
        setIsFavorited(favorited);
      });
  }, [checkFavorite, id]);

  const toggleFavorite = async (event: React.MouseEvent) => {
  event.stopPropagation();

  try {
    if (isFavorited) {
      await unfavoriteShop(id);
    } else {
      await favoriteShop(id);
    }
    setIsFavorited(!isFavorited);
  } catch {
    console.error('Failed to toggle favorite status');
  }
};

  return (
    <Box
      w="260px"
      h={cardHeight} // 高さをstateから取得
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
      position="relative"
    >
      <Stack textAlign="center">
        <Image
          borderRadius="full"
          boxSize="160px"
          src={imageUrl}
          alt={shopName}
          m="auto"
        />
        <Text fontSize="lg" fontWeight="bold">
          {shopName}
        </Text>
        <Text fontSize="sm" color="gray">
          {description}
        </Text>
        <Text fontSize="sm" color="gray">
          {genre}
        </Text>
        <Text fontSize="sm" color="gray">
          {area}
        </Text>
        <Text fontSize="sm" color="gray">
            {address}
        </Text>
        {reservationDate && ( // 予約日時が存在すれば表示
          <Text fontSize="m" color="blue">
            Reservation: {reservationDate}
          </Text>
        )}
        <FaHeart
          color={isFavorited ? "tomato" : "gray"}
          onClick={toggleFavorite}
          size="1.5em"
          style={{ cursor: "pointer", position: "absolute", left: "10px", bottom: "10px" }}
        />
      </Stack>
    </Box>
  );
});


