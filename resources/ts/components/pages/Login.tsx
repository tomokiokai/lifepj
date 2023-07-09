import React, { ChangeEvent, FC, memo, useState, useEffect } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import qs from 'qs';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from '../../store/userState';
import { GoogleLoginButton } from "../atoms/button/GoogleLoginButton";


type LoginProps = {
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  loading: boolean;
};

export const Login: FC<LoginProps> = memo(({ login, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const setLoginUser = useSetRecoilState(loginUserState);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      handleGoogleCallback(code);
    }
  }, [location]);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onClickLogin = () => {
    login({ email, password });
  };

  const handleGoogleLogin = () => {
     console.log("handleGoogleLogin is called"); // これを追加
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || "http://localhost";
    const scope = "profile email";
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    console.log("Auth URL:", authUrl); // これを追加
    console.log("Before redirect"); // 追加
    // GoogleのOAuth 2.0エンドポイントにリダイレクト
    window.location.href = authUrl;
    console.log("After redirect"); // 追加
  };

  const handleGoogleCallback = (code:string) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const clientSecret =process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "";
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || "http://localhost";

      // ここで変数の値をログ出力
    console.log('clientId:', clientId);
    console.log('clientSecret:', clientSecret);
    console.log('redirectUri:', redirectUri);

    axios.post("https://oauth2.googleapis.com/token", qs.stringify({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
  }
    )
      .then(response => {
      console.log(response); // 追加
        const idToken = response.data.id_token;
        console.log(idToken);
      return axios.post("/api/google-login", { googleToken: idToken });
    })
    .then(response => {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      // Handle response, possibly redirecting the user or showing a success message
      setLoginUser(response.data.user);
      navigate("/home");
    })
      .catch(error => {
      console.error(error.response.data);
      console.error(error);
      // Handle errors
    });
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
          {/* Google Login */}
          <GoogleLoginButton onClick={handleGoogleLogin} />
          {/* Registerへのリンク */}
          <Flex align="center" justify="center">
            <Link to="/register">新規登録はこちら</Link>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
});
