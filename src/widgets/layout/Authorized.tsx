import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Tab,
  Tabs,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { userModel } from '@/entities/user';
import { viewerModel } from '@/entities/viewer';
import { Logo } from '@/shared/ui/assets/Logo';

export const useUser = (): any => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

type UserType = {
  id: number;
  username: string;
};

const UsersMap = new Map([
  ['Роман', { id: 1, username: 'Роман' }],
  ['Данил', { id: 2, username: 'Данил' }],
]);

const UserContext = createContext<any | undefined>(undefined);

export const UserProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const [input, setInput] = useState<string>('');
  const isUser = UsersMap.has(input);

  const users = userModel.useUser({
    username: UsersMap.get(input)?.username || '',
    enabled: isUser,
  });

  const { user, setUser, token, setToken } = useUser();

  useEffect(() => {
    if (users.isSuccess && users.data) {
      setUser(users.data[0]);
    }
  }, [users.isSuccess]);

  const handleTextInputChange = (event: any) => {
    event!.preventDefault();
    setInput(event!.target!.value);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(
        'https://sharing-back.onrender.com/api/auth/local',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: email,
            password: password,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message[0].messages[0].message);
      }

      const data = await response.json();
      const jwtToken = data.jwt;
      return jwtToken;
    } catch (error) {
      console.error('Authentication error:', error?.message || '');
      throw error;
    }
  };

  // Использование функции для входа и получения токена
  const email = 'denisov.daniil.2018@gmail.com';
  const password = 'Greg123493';

  useEffect(() => {
    if (!token) {
      const log = async () => {
        const jwtToken = await login(email, password);
        setToken(jwtToken);
      };
      log();
    }
  }, [token]);

  return !user ? (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1e1e',
      }}
    >
      <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <FormControl sx={{ width: '200px' }}>
          <OutlinedInput
            onChange={handleTextInputChange}
            type="text"
            placeholder="Please enter username"
            sx={{
              height: '50px',
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
            }}
          />
        </FormControl>
      </form>
    </Box>
  ) : (
    <Box
      sx={{
        backgroundColor: '#1e1e1e',
        width: '100%',
        height: '100vh',
      }}
    >
      <Box sx={{ zIndex: '20000' }}>
        <Header />
      </Box>
      {children}
    </Box>
  );
};

export const Authorized = ({ children }: PropsWithChildren) => {
  return (
    <UserProvider>
      <Content>{children}</Content>
    </UserProvider>
  );
};

const Header = () => {
  const router = useRouter();
  const isDashboardTab = router.pathname === '/dashboard';
  const isProfileTab = router.pathname === '/profile';

  const handleTabChange = (event, newValue) => {
    const destination = newValue === 0 ? '/dashboard' : '/profile';
    router.push(destination);
  };

  const { isXS } = viewerModel.useResolution();

  return (
    <Box
      sx={{
        width: '100%',
        height: '50px',
        boxShadow: '0px 4px 8px -4px rgba(34, 60, 80, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '20px',
        backgroundColor: '#2d2d30',
      }}
    >
      <Logo />
      <Tabs
        value={isDashboardTab ? 0 : 1}
        onChange={handleTabChange}
        textColor="primary"
        sx={{
          minWidth: 'auto',
        }}
      >
        <Tab
          label="Объявления"
          sx={{
            color: isDashboardTab ? 'primary.main' : 'text.primary',
            borderBottom: isDashboardTab ? '2px solid #59ffd8' : 'none',
            borderRadius: 0,
            marginRight: '20px',
            fontWeight: 500,
          }}
        />
        <Tab
          label="Профиль"
          sx={{
            color: isProfileTab ? 'primary.main' : 'text.primary',
            borderBottom: isProfileTab ? '2px solid #59ffd8' : 'none',
            borderRadius: 0,
            fontWeight: 500,
          }}
        />
      </Tabs>

      <Button
        variant="outlined"
        sx={{
          height: '40px',
          minWidth: isXS ? '50px' : '140px',
          fontSize: isXS ? '8px' : '12px',
          textTransform: 'none',
          borderRadius: '6px',
          color: 'black',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: '#59ffd8',
          },
        }}
        onClick={() => router.push('/create_product')}
      >
        Создать объявление
      </Button>
    </Box>
  );
};
