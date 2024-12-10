'use client';

import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { SignIn } from '@clerk/nextjs';

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle, rgba(63,81,181,0.2) 0%, rgba(33,150,243,0.5) 60%, rgba(21,101,192,0.8) 100%)`,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          // padding: 4,
          // maxWidth: ,
          // width: '100%',
          // textAlign: 'center',
          // borderRadius: 3,
          // boxShadow: 3,
          // backgroundColor: 'white',
        }}
      >
        <SignIn />
      </Box>
    </Box>
  );
};

export default LoginPage;