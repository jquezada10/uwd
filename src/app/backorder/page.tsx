import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import FormFilterBackOrder from '@/components/backorder/FormFilterBackOrder';
import TableDataBackOrder from '@/components/backorder/TableDataBackOrder';
import TableDataOnClient from '@/components/backorder/TableDataOnClient';
// import DateTableBackOrder from '@/components/backorder/DataTableBackOrder';
// import DataGridBackOrder from '@/components/backorder/DataGridBackOrder';
// import DataGridServerSide from '@/components/backorder/DataGridServerSide';

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
        <br />
        <br />
        <TableDataOnClient />
      </Box>
    </Container>
  );
}