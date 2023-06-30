import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { GoogleLogin } from "react-google-login";

import { PrimaryButton } from "../atoms/botton/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login: FC = memo(() => {
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState('');

  const onChangeUserID = (e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);

  const onClickLogin = () => login(userId);

  const responseGoogle = (response) => {
    // Googleログインのレスポンスを処理するコードを追加
    // レスポンスから取得したトークンなどをサーバーに送信して認証処理を行う
    // レスポンスが成功した場合、login関数を呼び出してユーザーをログインさせる
    // 例: login(response.accessToken);
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">ユーザー管理アプリ</Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" value={userId} onChange={onChangeUserID} />
          <PrimaryButton
            isDisabled={userId === ''}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          {/* Googleログインボタン */}
          <GoogleLogin
            clientId="your-client-id" // 自分のGoogleクライアントIDに置き換える
            buttonText="Googleログイン"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </Stack>
      </Box>
    </Flex>
  )
});