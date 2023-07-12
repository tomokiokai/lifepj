import { Button, ButtonProps, Flex, Image, Text } from "@chakra-ui/react";
import { FC, memo } from "react";
import GoogleLogo from "../../../assets/images/GoogleLogo.svg";

interface GoogleLoginButtonProps extends ButtonProps {
  onClick: () => void;
  buttonText: string; // 新しいpropsを追加します
}

export const GoogleLoginButton: FC<GoogleLoginButtonProps> = memo((props) => {
  const { onClick, buttonText } = props; // buttonTextをpropsから抽出します

  return (
    <Button
      leftIcon={
        <Flex>
          <Image src={GoogleLogo} boxSize="20px" />
          <Text ml="2">{buttonText}</Text> {/* ボタンのテキストを動的に設定します */}
        </Flex>
      }
      onClick={onClick}
      backgroundColor="white"
      color="gray.500"
      boxShadow="0px 4px 14px rgba(0, 0, 0, 0.1)"
      _hover={{ bg: "gray.100" }}
      _active={{ bg: "gray.200" }}
    />
  );
});
