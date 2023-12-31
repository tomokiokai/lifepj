import React, { useEffect, useCallback } from "react";
import { Box, Flex, Heading, Link, useDisclosure, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loginUserState } from '../../../store/userState';
import { useAuth } from "../../../hooks/useAuth";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import headerBackground from '../../../assets/images/HeaderBack.jpg';
import logoImage from '../../../assets/images/Logo.jpg';

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
  const onClickShopManagement = useCallback(() => navigate("/home/shop_management"), [navigate]); // 新しいShopManagementへのリンク

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem("loginUser"); // ローカルストレージからユーザー情報を削除
  }, [logout]);
  const onClickMyPage = useCallback(() => navigate("/home/mypage"), [navigate]);

  return (
    <>
      <Flex
        as="nav"
        backgroundColor="rgba(128, 128, 128, 0.5)"  // 半透明のグレーに変更
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
          <Image 
            src={logoImage} 
            boxSize="50px"
            borderRadius="full"
            mr={2}
          />
          <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontFamily="body" color="green.300">
            Life
          </Heading>
        </Flex>
        <Flex align="center" fontSize="xl" flexGrow={2} display={{ base: "none", md: "flex" }}>
          {loginUser && (loginUser.role === 2 || loginUser.role === 3) && (
            <Box pr={4}>
              <Link onClick={onClickUserManagement}>Users</Link>
            </Box>
          )}
          <Box pr={4}>
            <Link onClick={onClickShopManagement}>Shop</Link>
          </Box>
          <Link onClick={onClickMyPage}>MyPage</Link>
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
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickUserManagement={onClickUserManagement} onClickSetting={onClickSetting} onClickShopManagement={onClickShopManagement} /> {/* 新しいShopManagementへのリンク */}
    </>
  );
};
