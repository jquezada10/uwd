import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { FilterParams } from '@/lib/definitions';
import BackOrderRow from './BackOrderRow';
import { Suspense } from 'react';

export default function BackOrderTable({filters}: {filters:FilterParams}) {
    console.log('filtros - BackOrderTable:', filters)
    return (
        <TableContainer component={Paper}>
            <Table aria-label="backorder-main" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>#</TableCell>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>Order Number</TableCell>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>PO Number</TableCell>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>Line</TableCell>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>Unit</TableCell>
                        <TableCell sx={{ fontWeight: 650}}>Customer</TableCell>
                        <TableCell sx={{ fontWeight: 650, width: 350}}>Reason</TableCell>
                        <TableCell sx={{ fontWeight: 650}}>Notes</TableCell>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>Material/Part Expected Date</TableCell>
                        <TableCell sx={{ width: 10, fontWeight: 650}}>Customer Expected Date</TableCell>
                    </TableRow>
                </TableHead>
                <Suspense fallback={<p>LOADING.............</p>}>
                    <BackOrderRow filters={filters}/>
                </Suspense>
            </Table>
        </TableContainer>
    );
}