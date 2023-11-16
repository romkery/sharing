import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';

export type PageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: 60 * 1000,
          },
        },
      }),
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: '#48ffd5',
      },
      secondary: {
        main: '#ff4081',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#FFFFFF',
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: '#3e3e42' }}>
          {getLayout(<Component {...pageProps} />)}
          <style jsx global>
            {`
              body {
                background: #1e1e1e;
              }
            `}
          </style>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
