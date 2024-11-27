'use client';
import * as React from 'react';
import type { } from '@mui/x-data-grid/themeAugmentation';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '@/components/AppNavbar';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import AppTheme from '@/shared-theme/AppTheme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const xThemeComponents = {};

export default function RootLayout(props: { children: React.ReactNode, disableCustomTheme: false }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
              <SideMenu />
              <AppNavbar />
              <Box component="main" sx={(theme) => ({ flexGrow: 1, overflow: 'auto', })}>
                <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 }, }}>
                  <Header />
                </Stack>
                {props.children}
              </Box>
            </Box>
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}