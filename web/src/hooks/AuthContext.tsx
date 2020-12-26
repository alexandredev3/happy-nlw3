import React, { 
  createContext,
  useContext, 
  useCallback, 
  useState,
  useMemo
} from 'react';
import { useCookies } from 'react-cookie';

import api from '../services/api';

interface IUserData {
  user: {
    id: string;
    name: string;
  }
  token: string
}

interface ISigninCrendials {
  email: string;
  password: string;
  isSaveToken: boolean;
}

interface IAuthContextData {
  signed: boolean;
  inProgress: boolean;
  userData: IUserData | null;
  signIn(signinCrendials: ISigninCrendials): void;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [ cookie, setCookie, removeCookie ] = useCookies();

  const [userData, setUserData] = useState<IUserData | null>(() => {
    const cookieToken = cookie.logged_in;
    const StorageUser = localStorage.getItem('@HappyAuth:user');

    if (cookieToken && StorageUser) {
      api.defaults.headers.Authorization = `Bearer ${cookieToken}`;

      return { 
        user: JSON.parse(StorageUser), 
        token: cookieToken 
      }
    };

    return {} as IUserData;
  });
  const [inProgress, setInProgress] = useState(false);

  const signIn = useCallback(async ({ email, password, isSaveToken }) => {
    setInProgress(true);

    const response = await api.post('/session', {
      email,
      password
    }, {
      onDownloadProgress: () => {
        setInProgress(false);
      }
    });

    const { user, token } = response.data;

    setUserData({ user, token });

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const dateNow = new Date();
    const expiresIn = new Date(dateNow.setDate(dateNow.getDate() + 3));

    if (isSaveToken) {
      setCookie('logged_in', token, {
        expires: expiresIn,
      })

      localStorage.setItem('@HappyAuth:user', JSON.stringify(user));
    }
  }, [userData])

  const signOut = useCallback(() => {
    removeCookie('logged_in');
    localStorage.removeItem('@HappyAuth:user');

    setUserData({} as IUserData);
  }, [userData])

  return (
    <AuthContext.Provider
      value={{ signed: !!userData?.token, inProgress, userData, signIn, signOut  }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth context must be used within an AuthProvider');
  }

  return context;
}