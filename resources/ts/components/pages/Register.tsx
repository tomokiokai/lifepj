import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/botton/PrimaryButton";
import { useRegister } from "../../hooks/useRegister";

export const Register: FC = memo(() => {
  const { register, loading } = useRegister();
  const [userId, setUserId] = useState('');

  const onChangeUserID = (e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

  const onClickRegister = () => register(userId); // register関数を呼び出す

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">Register</Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" value={userId} onChange={onChangeUserID} />
          <PrimaryButton
            isDisabled={userId === ''}
            loading={loading}
            onClick={onClickRegister} // onClickLoginではなくonClickRegisterに変更する
          >
            登録
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
});
