import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800"
      },
    },
  },
  fonts: {
    heading: "Palette Mosaic, sans-serif",
    body: "Palette Mosaic, sans-serif",
    mono: "Menlo, monospace",
  },
  
});

export default theme;
