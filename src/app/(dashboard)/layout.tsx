'use client';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '@/components/dashboard/AppNavbar';
import Header from '@/components/dashboard/Header';
import MainGrid from '@/components/dashboard/MainGrid';
import SideMenu from '@/components/dashboard/SideMenu';
import AppTheme from '@/theme/AppTheme';
import Typography from '@mui/material/Typography';
import Copyright from '@/internals/components/Copyright';
// import {
// //   chartsCustomizations,
// //   dataGridCustomizations,
// //   datePickersCustomizations,
// //   treeViewCustomizations,
// } from './theme/customizations';

const xThemeComponents = {
  //   ...chartsCustomizations,
  //   ...dataGridCustomizations,
  //   ...datePickersCustomizations,
  //   ...treeViewCustomizations,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AppTheme {...props} disableCustomTheme={false} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
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
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                BACKORDERS ADMIN 1.0
              </Typography>
              { props.children }
              <Copyright sx={{ my: 4 }} />
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
