import { createContext, useEffect, useMemo, useState, useContext } from 'react';

import { removeLocalStorage, setLocalStorage } from '../utils/local-storage';
import { IAuthContext, Props, UserType } from '../models';
import { verifyToken } from '../services/auth.service';

const initialValue = {
  loading: true,
  authenticated: false,
  userInfo: null,
  setAuthenticated: (value: boolean) => {},
  setUserInfo: (value: UserType) => {},
  logout: () => {},
  login: (token: string, userInfo: UserType) => {},
} as IAuthContext;

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(initialValue.authenticated);
  const [userInfo, setUserInfo] = useState<UserType | null>(initialValue.userInfo);
  const [loading, setLoading] = useState(initialValue.loading);

  const logout = () => {
    removeLocalStorage('token');
    setAuthenticated(false);
    setUserInfo(null);
  };

  const login = (token: string, userInfo: UserType) => {
    setLocalStorage('token', token);
    setAuthenticated(true);
    setUserInfo(userInfo);
  };

  const authValue = useMemo(
    () => ({
      loading,
      authenticated,
      setAuthenticated,
      userInfo,
      setUserInfo,
      logout,
      login,
    }),
    [authenticated, userInfo, loading]
  );

  useEffect(() => {
    setLoading(true);
    verifyToken()
      .then((result: any) => {
        if (result !== 'Unauthorized') {
          setAuthenticated(true);
          setUserInfo({
            email: result.email,
            role: result.role,
            is_active: true,
          } as UserType);
        } else {
          logout();
        }
      })
      .catch(err => {
        logout();
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
