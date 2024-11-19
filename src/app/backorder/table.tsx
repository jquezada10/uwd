'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Order } from '@/lib/definitions'
interface TableProps {
  data: number[]
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID',  },
  { field: 'firstName', headerName: 'First name', },
  { field: 'lastName', headerName: 'Last name', },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Table({utlimasOrders,}: {utlimasOrders: Order[],}) {
    // <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
    //   <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
    //         Details
    //       </Typography>
    //       <Grid container spacing={2} columns={12}>
    //         <Grid size={{ xs: 12, lg: 12 }}>
    //           <Paper elevation={3} sx={{width: '100%' }}>
    //             <DataGrid
    //               disableColumnSorting 
    //               rows={rows}
    //               columns={columns}
    //               initialState={{ pagination: { paginationModel } }}
    //               pageSizeOptions={[5, 10]}
    //               checkboxSelection
    //               density="compact"
    //             />
    //           </Paper>
    //         </Grid>
    //       </Grid>
      //   </Box>
    {
      utlimasOrders.map((invoice, i) => console.log(invoice))
    }
}