import {
  Wrap,
  WrapItem,
  Spinner,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSlectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  
  console.log(loginUser);

  useEffect(() => getUsers(), [getUsers]);

  const onClickUser = useCallback(
    (id: number) => {
      console.log(id);
      onSlectUser({ id, users, onOpen });
    },
    [users, onOpen, onSlectUser]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
          {users.map((user) => {
            return (
              <WrapItem key={user.id}>
                <UserCard
                  id={user.id}
                  imageUrl="https://source.unsplash.com/random"
                  userName={user.username}
                  fullName={user.name}
                  onClick={onClickUser}
                />
              </WrapItem>
            );
          })}
        </Wrap>
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
        isAdmin={loginUser?.isAdmin}
      />
    </>
  );
});
