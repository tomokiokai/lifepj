import { FC, memo, useCallback } from "react";
import { Box, Flex, Heading, Link, useDisclosure} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { logout } = useAuth(); // useAuthフックからlogout関数を取得

  const onClickHome = useCallback(() => navigate("/home"), [navigate]);
  const onClickUserManagement = useCallback(() => navigate("/home/user_management"), [navigate]);
  const onClicSetting = useCallback(() => navigate("/home/setting"), [navigate]);

  const handleLogout = useCallback(() => {
    logout(); // ログアウト処理を呼び出す
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
      <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md:"flex" }}>
        <Box pr={4}>
          <Link onClick={onClickUserManagement}>ユーザー一覧</Link>
        </Box>
          <Link onClick={onClicSetting}>設定</Link>
        </Flex>
        <Box>
          <Link onClick={handleLogout}>ログアウト</Link> {/* ログアウトボタンを追加 */}
        </Box>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickUserManagement={onClickUserManagement} onClicSetting={onClicSetting} />
    </>
  );
});
