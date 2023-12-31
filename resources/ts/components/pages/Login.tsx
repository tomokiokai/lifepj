import React, { ChangeEvent, FC, memo, useState, useEffect } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import qs from 'qs';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from '../../store/userState';
import { GoogleLoginButton } from "../atoms/button/GoogleLoginButton";
import { useMessage } from "../../hooks/useMessage";


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
  const { showMessage } = useMessage();

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
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || "http://localhost";
    const scope = "profile email";
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  };

  const handleGoogleCallback = (code:string) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "";
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || "http://localhost";

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
    })
    .then(response => {
        const idToken = response.data.id_token;

      return axios.post("/api/google-login", { googleToken: idToken });
    })
    .then(response => {
  const userData = {
    ...response.data.user,  // 既存のユーザーデータ
    token: response.data.token  // トークンを追加
  };
  localStorage.setItem('loginUser', JSON.stringify(userData));  // ローカルストレージに保存
  setLoginUser(userData);  // Recoilステートに保存

      if (response.data.error) {
        showMessage({ title: response.data.error, status: "error" });
      } else if (!response.data.user?.is_verified) {
        showMessage({ title: response.data.message, status: "info" });
      } else {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        showMessage({ title: "ログインしました", status: "success" });
        navigate("/home");
      }
    })
    .catch(error => {
      if (!error.response || error.response.status === 500) {
        showMessage({ title: "Server error occurred", status: "error" });
      }
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
          <GoogleLoginButton onClick={handleGoogleLogin} buttonText="Login with Google" />
          <Flex align="center" justify="center">
            <Link to="/register">Registerはこちら</Link>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
});
