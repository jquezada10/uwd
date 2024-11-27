import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Suspense } from 'react';
import { TableRowSkeleton } from '@/components/skeletons'
import TableRowBackOrder from '@/components/backorder/TableRowBackOrder';
import TableBody from '@mui/material/TableBody';
import Skeleton from '@mui/material/Skeleton';

export default async function TableDataBackOrder({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  return (
    <TableContainer sx={{ maxHeight: 720, }}>
      {/* <pre style={{ fontSize: 10 }}>
          {JSON.stringify(selectedArray, null, 4)}
      </pre> */}

      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={'1'} sx={{ p: 0 }}></TableCell>
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
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
              <TableCell><Skeleton animation="wave" variant="rectangular" height={15}/></TableCell>
            </TableRow>
            }>
            <TableRowBackOrder query={query} currentPage={currentPage}/>
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
}