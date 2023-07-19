import React, { useEffect, useState } from 'react';
import { Box, Image, keyframes } from '@chakra-ui/react';

const imageUrls = Array.from({length: 700}, (_, i) => `https://source.unsplash.com/random/100x100?sig=${i+1}`);

const bubbleAppear = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const bubbleFloat = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-100vh); opacity: 1; }
`;

function generateInitialState() {
  return imageUrls.map(() => {
    const size = Math.random() * 100 + 100; // Size is between 100 and 200
    const x = Math.random() * (100 - size / window.innerWidth * 100); // x position is adjusted based on size
    return {
      x: x,
      y: 0,
      size: size,
      delay: Math.random() * 10,
      speed: Math.random() * 30 + 20,
    };
  });
}


export const BubbleImages = () => {
  const [state, setState] = useState(generateInitialState());

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the state to generate new bubbles after the longest animation has ended
      setState(generateInitialState());
    }, Math.max(...state.map(({ speed, delay }) => speed + delay)) * 1000);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      {state.map(({ x, y, size, delay, speed }, i) => (
        <Image
          key={i}
          src={imageUrls[i]}
          position="absolute"
          left={`${x}%`}
          bottom={`${y}%`}
          boxSize={`${size}px`}
          borderRadius="full"
          animation={`${bubbleAppear} 2s ease-out ${delay}s, 
                      ${bubbleFloat} ${speed}s linear ${delay}s infinite`}
        />
      ))}
    </Box>
  );
};


