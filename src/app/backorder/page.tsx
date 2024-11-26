import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FormFilterBackOrder from '@/components/backorder/FormFilterBackOrder';
import TableDataBackOrder from '@/components/backorder/TableDataBackOrder';


export default function Home() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormFilterBackOrder />
        <br />
        <br />
        <TableDataBackOrder />
        {/* <br /> */}
        {/* <br /> */}
        {/* <TableDataOnClient /> */}
      </Box>
    </Container>
  );
}