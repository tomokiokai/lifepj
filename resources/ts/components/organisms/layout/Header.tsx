import React, { useEffect, useCallback } from "react";
import { Box, Flex, Heading, Link, useDisclosure, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUserState } from '../../../store/userState';
import { useAuth } from "../../../hooks/useAuth";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header = () => {
  const setLoginUser = useSetRecoilState(loginUserState);
  const loginUser = useRecoilValue(loginUserState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
  }, [setLoginUser]);

  const onClickHome = useCallback(() => navigate("/home"), [navigate]);
  const onClickUserManagement = useCallback(() => navigate("/home/user_management"), [navigate]);
  const onClickSetting = useCallback(() => navigate("/home/setting"), [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem("loginUser"); // ローカルストレージからユーザー情報を削除
  }, [logout]);

  return (
    <>
      <Flex
        as="nav"
        bg="green.300"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            顧客管理アプリ
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
          </Box>
          <Link onClick={onClickSetting}>設定</Link>
        </Flex>
        <Box>
          {loginUser && (
            <Text display={{ base: "none", md: "block" }} mr={2}>
              こんにちは{loginUser.name}さん
            </Text>
          )}
          <Link onClick={handleLogout}>ログアウト</Link>
        </Box>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickUserManagement={onClickUserManagement} onClickSetting={onClickSetting} />
    </>
  );
};