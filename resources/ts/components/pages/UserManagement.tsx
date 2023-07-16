import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { Center,  Spinner, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  useEffect(() => {
    getUsers();
  }, []);

  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen })
  }, [onSelectUser, users, onOpen]);

  const getRandomImageUrl = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 1000);
    return `http://unsplash.it/500/300?random=${randomNum}`;
  }, []);

  // 各ユーザーにランダムな画像のURLを割り当てる
  const usersWithRandomImage = useMemo(
    () =>
      users
        .filter((user) => user.role === 1)
        .map((user) => ({
        ...user,
        imageUrl: getRandomImageUrl(),
      })),
    [users, getRandomImageUrl]
  );
  //src="https://source.unsplash.com/VjRpkGtS55w"

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {usersWithRandomImage.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl={user.imageUrl}
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});