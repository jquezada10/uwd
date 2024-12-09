'use server';
import * as React from 'react';
import crypto from 'crypto';
import Chip from "@mui/material/Chip";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { fecthBackOrderFiles, fetchBackOrdersPages, fetchDBBackOrders, fetchPrismaBackOrderFile } from "@/lib/data";
import { BackOrder, BackOrderFile, BackOrderGeneral, SearchParams } from "@/lib/definitions";
import NoteUserBackOrderFile from "@/components/backorder/NoteUserBackOrderFile";
import ReasonBackOrderFile from "@/components/backorder/ReasonBackOrderFile";
import DateExpected from '@/components/backorder/DateExpected';
import FormFilterBackOrder from "@/components/backorder/filter/FormFilterBackOrder";
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Pagination from '@/components/backorder/ui/pagination';


function generateKey(length: number = 8): string {
    return crypto.randomBytes(length).toString('hex');
}

function ChipLocation({ location }: { location: string }) {
    const locationOrd = location.at(0);
    if (locationOrd == 'M') {
        return <Chip size="small" label={locationOrd} color='success' />
    }
    if (locationOrd == 'W') {
        return <Chip size="small" label={locationOrd} color='primary' />
    }
}

export default async function BackOrderPage(
    props: {
        searchParams?: Promise<{
            ord?: string;
            cus?: string;
            loc?: string,
            pag?: string;
            sch?: string
            ids?: string
        }>;
    }) {

    const searchParams = await props.searchParams;
    const ord: string = searchParams?.ord || '';
    const cus: string = searchParams?.cus || '';
    const loc: string = searchParams?.loc || 'ALL';
    const sch: string = searchParams?.sch || '';
    const pag: number = Number(searchParams?.pag) || 1;
    const ids: string | undefined = searchParams?.ids;
    const rea: number[] = !ids ? [] : ids.split(',').map(Number);
    let totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag });
    let backorders: BackOrder[] = [];

    if (rea.length == 0 || rea[0] <= 3) {
        backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag });
    } else {
        const files: Array<{}> = await fecthBackOrderFiles(rea)
        if(files.length != 0){
            backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files });
            totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files });
        }
    }

    const bkoWithFile: BackOrderGeneral[] = await Promise.all(
        backorders.map(async (bko: BackOrder) => {
            const codeBackOrderFile: string = bko.SchedID + '-' + bko.UnitID + '-' + bko.OrderNumber;
            const backOrderFile: BackOrderFile = await fetchPrismaBackOrderFile(codeBackOrderFile)
            return {
                ...bko,
                ...backOrderFile,
            };
        })
    );
    return (
        <div>
            <FormFilterBackOrder />

            <TableContainer component={Paper}>
                <Table aria-label="backorder-main" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>All</TableCell>
                            <TableCell>#</TableCell>
                            <TableCell>Order</TableCell>
                            <TableCell>Line</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Expected Date</TableCell>
                            <TableCell>Estimate Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bkoWithFile.map((row: BackOrderGeneral, i: number) => (
                            <TableRow key={generateKey()}>
                                <TableCell>
                                    #
                                </TableCell>

                                <TableCell>
                                    {i + 1}
                                </TableCell>

                                <TableCell>
                                    {row.OrderNumber}
                                </TableCell>

                                <TableCell>
                                    {row.LineItem}
                                </TableCell>

                                <TableCell>
                                    {row.UnitID.toString() !== 'NULL' ? row.UnitID : <Chip label="Unscheduled" />}
                                </TableCell>

                                <TableCell>
                                    < ChipLocation location={row.LocationID} /> {row.CUSTOMER}
                                </TableCell>

                                <TableCell>
                                    {row.UnitID.toString() !== 'NULL' ? <ReasonBackOrderFile key={generateKey()} backOrderFile={row} /> : ''}
                                </TableCell>

                                <TableCell>
                                    {row.UnitID.toString() !== 'NULL' ? <NoteUserBackOrderFile key={generateKey()} backOrderFile={row} /> : ''}
                                </TableCell>

                                <TableCell>
                                    {row.UnitID.toString() !== 'NULL' ? <DateExpected key={generateKey()} backOrderFile={row} /> : ''}
                                </TableCell>

                                <TableCell>
                                    {
                                        row.newDateClient ?
                                            <Chip label={row.newDateClient?.toLocaleDateString()} color="primary" variant="outlined" size="small" />
                                            : <Chip icon={<PendingActionsIcon />} label="Pending..." size="small" />
                                    }

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination Backorder */}
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ xs: 'column', sm: 'row' }}
            >
                <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                    <Pagination totalPages={totalPages} />
                </Grid>
                <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
                    <Stack spacing={0} sx={{ mx: 2 }} flexDirection={{ xs: 'row', sm: 'column' }}>
                        <span><Chip size="small" label='M : M A I N' color='success' /></span>
                        <span><Chip size="small" label='W : WAYNE' color='error' /></span>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
