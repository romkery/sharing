import { Box, FormControl, OutlinedInput } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, useEffect, useState } from 'react';

import { userModel } from '@/entities/user';
import { AppLayoutAuthorized } from '@/widgets/layout';
import { useUser } from '@/widgets/layout/Authorized';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

type UserType = {
  id: number;
  username: string;
};

const UsersMap = new Map([
  ['Роман', { id: 1, username: 'Роман' }],
  ['Данил', { id: 2, username: 'Данил' }],
]);

const Home = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState<string>('');
  const isUser = UsersMap.has(input);

  const users = userModel.useUser({
    username: UsersMap.get(input)?.username || '',
    enabled: isUser,
  });

  const { user, setUser } = useUser();

  useEffect(() => {
    if (users.isSuccess && users.data) {
      setUser(users.data[0]);
    }
  }, [users.isSuccess]);

  const handleTextInputChange = (event: any) => {
    event!.preventDefault();
    setInput(event!.target!.value);
  };

  return (
    <Box
      sx={{
        maxWidth: '100dvw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textWrap: 'wrap',
        wordBreak: 'break-word',
        fontSize: '16px',
        textTransform: 'none',
        textDecoration: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {!isUser ? (
          <Box>
            <form
              noValidate
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormControl sx={{ width: '200px' }}>
                <OutlinedInput
                  onChange={handleTextInputChange}
                  type="text"
                  placeholder="Please enter username"
                  sx={{ height: '50px' }}
                />
              </FormControl>
            </form>
          </Box>
        ) : (
          <Box sx={{ width: '100%' }}>
            {t('Hello')}
            {JSON.stringify(user)}
          </Box>
        )}
      </Box>
    </Box>
  );
};

Home.getLayout = (page: ReactElement) => (
  <AppLayoutAuthorized>{page}</AppLayoutAuthorized>
);

export default Home;
