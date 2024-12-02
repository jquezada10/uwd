'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import AppTheme from '@/theme/AppTheme';
import SideMenu from '@/components/dashboard/SideMenu';
import AppNavbar from '@/components/dashboard/AppNavbar';
import Header from '@/components/dashboard/Header';
import Copyright from '@/components/dashboard/Copyright';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <AppTheme disableCustomTheme={false} {...props}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box component="main" sx={() => ({ flexGrow: 1, overflow: 'auto', })} >
                    <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 }, }}>
                        <Header />
                        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                            <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                                {props.children}
                            </Grid>
                            <Copyright sx={{ my: 4 }} />
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
