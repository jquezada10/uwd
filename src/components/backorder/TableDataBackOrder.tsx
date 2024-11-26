import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Suspense } from 'react';
import { TableRowSkeleton } from '@/components/skeletons'
import TableRowBackOrder from '@/components/backorder/TableRowBackOrder';
import TableBody from '@mui/material/TableBody';
import { countBackOrder } from '@/components/backorder/TableRowBackOrder';

import { selectedArray } from '@/components/backorder/CheckBackOrder'

export default async function TableDataBackOrder() {
  return (
    <TableContainer sx={{ maxHeight: 720, }}>
      <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedArray, null, 4)}
      </pre>

      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={'1'} sx={{ p: 0 }}>{countBackOrder}</TableCell>
            <TableCell width={'1'}>#</TableCell>
            <TableCell width={'1'}>Order</TableCell>
            <TableCell width={'1'} align='center'>Line</TableCell>
            <TableCell width={'1'} align='center'>Unit</TableCell>
            <TableCell width={''}>Customer</TableCell>
            <TableCell width={''}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense fallback={
            <TableRow>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
              <TableCell>Loading...</TableCell>
            </TableRow>
          }>
            <TableRowBackOrder />
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
}