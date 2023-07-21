import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { FC, memo } from "react";

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
  const { id,
  imageUrl,
  shopName,
  description,
  area,
  address,
  genre,
  onClick } = props;
  return (
    <Box
      w="260px"
      h="320px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
      >
        <Stack textAlign="center">
          <Image
            borderRadius="full"
            boxSize="160px"
            src={imageUrl}  
            alt={shopName}
            m="auto"
          />
          <Text fontSize="lg" fontWeight="bold">{shopName}</Text>
        <Text fontSize="sm" color="gray">{description}</Text>
        <Text fontSize="sm" color="gray">{genre}</Text>
        <Text fontSize="sm" color="gray">{area}</Text>
        <Text fontSize="sm" color="gray">{address}</Text>
        </Stack>
    </Box>
  );
});
