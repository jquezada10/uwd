'use client'
import type { Metadata } from "next";
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import AppTheme from '@/shared-theme/AppTheme';
import Box from '@mui/material/Box';
import SideMenu from '@/components/SideMenu';
import AppNavbar from '@/components/AppNavbar';
import Stack from '@mui/material/Stack';
import Header from "@/components/Header";

const xThemeComponents = {};

export default function RootLayout(props: { children: React.ReactNode, disableCustomTheme:false }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline />
            <Box sx={{ display: 'flex' }}>
              <SideMenu />
              <AppNavbar />
              <Box
                component="main"
                sx={(theme) => ({
                  flexGrow: 1,
                  overflow: 'auto',
                })}
              >
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                  }}
                >
                  <Header />
                  {props.children}
                </Stack>
              </Box>
            </Box>
          </AppTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}