import { Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { FC, memo, useState } from "react";
import { useFavorite } from '../../../hooks/useFavorite';  // add this line

type Props = {
  id: number;
  imageUrl: string;
  shopName: string;
  description: string;
  area: string;
  address: string;
  genre: string;
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
    onClick,
  } = props;

  const [isFavorited, setIsFavorited] = useState(false);
  
  const { favoriteShop, unfavoriteShop } = useFavorite();

  const toggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorited((prevIsFavorited) => {
      if (prevIsFavorited) {
        unfavoriteShop(id); // お気に入りから削除する
      } else {
        favoriteShop(id); // お気に入りに追加する
      }
      return !prevIsFavorited;
    });
  };

  return (
    <Box
      w="260px"
      h="380px"
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
        <VStack
          spacing={1}
          overflowY="auto"
          maxH="60px"
          align="center"
          mb="24px"
        >
          <Text fontSize="sm" color="gray">
            {address}
          </Text>
        </VStack>
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

