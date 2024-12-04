import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Suspense } from 'react';
import TableRowBackOrder from '@/components/backorder/TableRowBackOrder';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';
// import { BackOrderTableSkeleton } from './ui/skeletons';

export default async function TableDataBackOrder({
  order,
  customer,
  location,
  currentPage,
  schdle
}: {
  order: string;
  customer: string;
  location: string;
  schdle: string;
  currentPage: number;
}) {
  return (
    <TableContainer sx={{}}>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={'1'} sx={{ p: 0 }} style={{ backgroundColor: '#f5f6fa' }}></TableCell>
            <TableCell width={'1'} style={{ backgroundColor: '#f5f6fa' }}>#</TableCell>
            <TableCell width={'1'} style={{ backgroundColor: '#f5f6fa' }}>Order</TableCell>
            <TableCell width={'1'} align='center' style={{ backgroundColor: '#f5f6fa' }}>Line</TableCell>
            <TableCell width={'1'} align='center' style={{ backgroundColor: '#f5f6fa' }}>Unit</TableCell>
            <TableCell width={''} style={{ backgroundColor: '#f5f6fa' }}>Customer</TableCell>
            <TableCell width={10} style={{ backgroundColor: '#f5f6fa' }}>Backorde Reason</TableCell>
            <TableCell width={''} style={{ backgroundColor: '#f5f6fa' }}>User Notes</TableCell>
            <TableCell width={''} style={{ backgroundColor: '#f5f6fa' }}>Material/Part Expected Date</TableCell>
            <TableCell width={''} style={{ backgroundColor: '#f5f6fa' }}>Estemated Delivery Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense key={order + customer + location + currentPage} fallback={
            <TableRow>
              <TableCell><Skeleton animation="wave" variant="rounded" height={20}  /></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={20}  /></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={20}  /></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={20}  /></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={20}  /></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={20}  /></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={20}  /></TableCell>
            </TableRow>
          }>
            <TableRowBackOrder order={order} customer={customer} location={location} schdle={schdle} currentPage={currentPage} />
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
}