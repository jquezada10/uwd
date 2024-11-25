// 'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import getBackOrders from "@/lib/data"
import { BackOrder } from '@/lib/definitions';
import TableRowBackOrder from '@/components/backorder/TableRowBackOrder';

const label = { inputProps: { 'aria-label': 'Select All' } };

export default async function TableDataBackOrder() {
  const data: BackOrder[] = await getBackOrders();
  return (
    <TableContainer sx={{ maxHeight: 440, }}>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={'xs'} sx={{ py: 0}}></TableCell>
            <TableCell width={'1'}>#</TableCell>
            <TableCell width={'1'}>Order</TableCell>
            <TableCell width={'1'} align='center'>Line</TableCell>
            <TableCell width={'1'} align='center'>Unit</TableCell>
            <TableCell width={''}>Customer</TableCell>
            <TableCell width={''}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => <TableRowBackOrder item={item} index={i} key={i} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}