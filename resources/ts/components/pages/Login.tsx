import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

type LoginProps = {
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  loading: boolean;
};

export const Login: FC<LoginProps> = memo(({ login, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onClickLogin = () => {
    login({ email, password });
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Login
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="メールアドレス"
            value={email}
            onChange={onChangeEmail}
          />
          <Input
            placeholder="パスワード"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <PrimaryButton
            isDisabled={email === "" || password === ""}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          {/* Registerへのリンク */}
          <Flex align="center" justify="center">
            <Link to="/register">新規登録はこちら</Link>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
});
