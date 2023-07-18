import { FC, memo, useState, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { RainbowHeading } from "../atoms/RainbowHeading";

const images = [
  "https://source.unsplash.com/VjRpkGtS55w",
  "https://source.unsplash.com/LGXN4OSQSa4",
  "https://source.unsplash.com/PtOfbGkU3uI",
];

export const Home: FC = memo(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Image
        src={images[currentImageIndex]}
        alt="Top Image"
        objectFit="cover"
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={-1}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        <RainbowHeading style={{ fontSize: "48px" }}>Welcome to Cadenza Salon</RainbowHeading>
  <p style={{ fontSize: "24px", color: "white" }}>Discover the art of beauty and relaxation</p>
</Box>
    </Box>
  );
});
