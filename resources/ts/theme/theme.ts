import { extendTheme } from "@chakra-ui/react";
import headerBackground from '../assets/images/HeaderBack.jpg'; // まずは画像をインポートします。

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: `url(${headerBackground})`, // ここで背景画像を設定します。
        backgroundSize: 'cover', // そして画像を全画面に広げるためにこれを追加します。
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
