import React from 'react';
import { FC, memo } from "react";
import { Button, Image } from "@chakra-ui/react";
import GoogleLogo from '../../../assets/images/GoogleLogo.svg';
type Props = {
  onClick: () => void;
}

export const GoogleLoginButton: FC<Props> = memo(({ onClick }) => {
  return (
    <Button leftIcon={<Image src={GoogleLogo} boxSize="25px" />} onClick={onClick}>
      Login with Google
    </Button>
  );
});
