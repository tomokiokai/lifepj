import { Box, Heading, HeadingProps, Flex } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

const rainbow = keyframes`
  0% {color: red;}
  14% {color: orange;}
  28% {color: yellow;}
  42% {color: green;}
  57% {color: blue;}
  71% {color: indigo;}
  85% {color: violet;}
  100% {color: red;}
`

export const RainbowHeading = (props: HeadingProps) => (
  <Heading
    css={{
      animation: `${rainbow} 5s infinite linear`,
      color: 'red',
    }}
    {...props}
  />
)


