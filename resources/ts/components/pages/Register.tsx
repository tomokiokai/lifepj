import { ChangeEvent, FC, memo, useState, useEffect } from "react"; // useEffectを追加
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom"; // これらを追加
import axios from "axios"; // 追加
import qs from 'qs'; // 追加
import { useSetRecoilState } from 'recoil'; // 追加
import { loginUserState } from '../../store/userState'; // 追加

import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { GoogleLoginButton } from "../atoms/button/GoogleLoginButton"; // これを追加
import { useRegister } from "../../hooks/useRegister";

export const Register: FC = memo(() => {
  const { register, loading } = useRegister();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // 追加
  const location = useLocation(); // 追加
  const setLoginUser = useSetRecoilState(loginUserState); // 追加

  useEffect(() => { // 追加
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");

    if (code) {
      handleGoogleCallback(code);
    }
  }, [location]);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const onClickRegister = () => register(username, password, email);

  // Googleログイン用の関数を追加
  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || "http://localhost";
    const scope = "profile email";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  };

  const handleGoogleCallback = (code:string) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const clientSecret =process.env.REACT_APP_GOOGLE_CLIENT_SECRET || "";
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
    }
    )
    .then(response => {
        const idToken = response.data.id_token;
        return axios.post("/api/google-login", { googleToken: idToken });
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      setLoginUser(response.data.user);
      navigate("/home");
    })
    .catch(error => {
      console.error(error.response.data);
      console.error(error);
    });
  };

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
            onClick={onClickRegister}
          >
            登録
          </PrimaryButton>
          <GoogleLoginButton onClick={handleGoogleLogin} buttonText="Register with Google" />
        </Stack>
      </Box>
    </Flex>
  )
});

