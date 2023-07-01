import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useRegister } from "../../hooks/useRegister";

export const Register: FC = memo(() => {
  const { register, loading } = useRegister();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onClickRegister = () => register(username, password, email); // register関数を呼び出す

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">Register</Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザー名" value={username} onChange={onChangeUsername} />
          <Input type="password" placeholder="パスワード" value={password} onChange={onChangePassword} />
          <Input type="email" placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          <PrimaryButton
            isDisabled={username === '' || password === '' || email === ''}
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

