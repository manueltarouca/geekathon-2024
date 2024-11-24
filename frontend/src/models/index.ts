import { ReactNode } from "react";

export type UserType = {
  email: string;
  role: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IAuthContext = {
  loading: boolean;
  authenticated: boolean;
  userInfo: UserType | null;
  setAuthenticated: (newState: boolean) => void;
  setUserInfo: (newUser: UserType | null) => void;
  logout: () => void;
  login: (token: string, userInfo: UserType) => void;
};

export type Props = {
  children?: ReactNode;
};
