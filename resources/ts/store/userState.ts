import { atom } from 'recoil';
import { User } from '../types/api/user';

export const loginUserState = atom<User | null>({
  key: 'loginUserState',
  default: null,
});
