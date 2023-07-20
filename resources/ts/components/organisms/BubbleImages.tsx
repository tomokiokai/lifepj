import React, { useEffect, useState } from 'react';
import { Box, Image, keyframes } from '@chakra-ui/react';

const imageUrls = Array.from({length: 10}, (_, i) => `https://source.unsplash.com/random/100x100?sig=${i+1}`);

const bubbleAppear = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const bubbleFloat = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(10vw, -50vh); }
  100% { transform: translate(0, -100vh); }
`;

function generateInitialState() {
  return imageUrls.map((_, i) => {
    const size = Math.random() * 100 + 100; 
    const x = Math.random() * (100 - size / window.innerWidth * 100);
    return {
      x: x,
      y: 0,
      size: size,
      delay: i * 2,  // stagger start times
      speed: Math.random() * 30 + 20,
      opacity: 0,  // initially set opacity to 0
    };
  });
}

export const BubbleImages = () => {
  const [state, setState] = useState(generateInitialState());

  useEffect(() => {
    const intervals = state.map(({ speed, delay }, i) => {
      return setInterval(() => {
        setState(prevState => {
          const newState = [...prevState];
          newState[i] = {...newState[i], delay: 0, opacity: 1};  // make bubble visible after its delay
          return newState;
        });
      }, (speed + delay) * 1000);
    });
    return () => intervals.forEach(clearInterval);
  }, [state]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      {state.map(({ x, y, size, delay, speed, opacity }, i) => (
        <Image
          key={i}
          src={imageUrls[i]}
          position="absolute"
          left={`${x}%`}
          bottom={`${y}%`}
          boxSize={`${size}px`}
          borderRadius="full"
          opacity={opacity}  // apply opacity property
          animation={`${bubbleAppear} 2s ease-out ${delay}s forwards, 
                      ${bubbleFloat} ${speed}s linear 0s infinite`}
        />
      ))}
    </Box>
  );
};
