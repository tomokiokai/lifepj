import { useCallback, useState } from "react"
import axios from "axios"
import { User } from "../types/api/user"
import { useMessage } from "./useMessage"

export const useAllUsers = () => {
  const { showMessage } = useMessage()

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    setLoading(true)
    axios
      .get<{ users: User[] }>("http://localhost:80/api/users")
      .then((res) => setUsers(res.data.users))
      .catch(() => {
        showMessage({ title: "ユーザー取得に失敗しました", status: "error" })
      }).finally(() => {
        setLoading(false)
      });
}, [showMessage]);
  
  return { getUsers, loading, users }
}