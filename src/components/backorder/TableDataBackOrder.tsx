'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'

import TableRowBackOrder from '@/components/backorder/TableRowBackOrder'
import { BackOrder } from '@/lib/definitions'

const label = { inputProps: { 'aria-label': 'Select All' } };

export default function TableDataBackOrder({ data }: { data: BackOrder[] }) {
  return (
    <TableContainer>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={'1'} sx={{ py: 0}}>
              <Checkbox {...label} id='selectAll' name='selectAll'/>
            </TableCell>
            <TableCell width={'1'}>#</TableCell>
            <TableCell width={'2'}>Order</TableCell>
            <TableCell width={'2'} align='center'>Line</TableCell>
            <TableCell width={'2'} align='center'>Unit</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => <TableRowBackOrder item={item} index={i} key={i} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}