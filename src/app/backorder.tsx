'use server';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { fetchDBBackOrders, fetchPrismaBackOrderFile } from "@/lib/data";
import {BackOrder, BackOrderFile, BackOrderGeneral} from "@/lib/definitions";
import NoteUserBackOrderFile from "@/components/backorder/NoteUserBackOrderFile";
import ReasonBackOrderFile from "@/components/backorder/ReasonBackOrderFile";
import DateExpected from '@/components/backorder/DateExpected';
import Chip from "@mui/material/Chip";

function ChipLocation({ location }: { location: string }) {
    const locationOrd = location.at(0);
    if (locationOrd == 'M') {
        return <Chip size="small" label={locationOrd} color='success' />
    }
    if (locationOrd == 'W') {
        return <Chip size="small" label={locationOrd} color='error' />
    }
}

interface SearchParams{
    ord?: string;
    cus?: string;
    loc?: string,
    pag?: number;
    sch?: string;
}

export default async function BackOrderMain(props: { searchParams?: Promise<{ ord?: string; cus?: string; loc?: string, pag?: string; sch?: string }>; })  {
    // Filter
    const aux = await props.searchParams
    console.log('props---from backorder.tsx', aux)
    const searchParams : SearchParams | undefined = await props.searchParams;
    const paramsFilter: SearchParams = {
        ord : searchParams?.ord || '',
        cus : searchParams?.cus || '',
        loc : searchParams?.loc || 'ALL',
        sch : searchParams?.sch || '',
        pag : Number(searchParams?.pag) || 1,
    }

    console.log('esto voy a pasar a DATA.TS', paramsFilter);

    // Main
    const backorders: BackOrder[] = await fetchDBBackOrders(paramsFilter);
    const bkoWithFile:BackOrderGeneral[] = await Promise.all(
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
        <TableContainer component={Paper}>
            <Table aria-label="backorder-main">
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
                    {bkoWithFile.map((row:BackOrderGeneral, i: number) => (
                        <TableRow key={i}>
                            <TableCell>
                                #
                            </TableCell>

                            <TableCell>
                                {i+1}
                            </TableCell>

                            <TableCell>
                                {row.OrderNumber}
                            </TableCell>

                            <TableCell>
                                { row.LineItem }
                            </TableCell>

                            <TableCell>
                                { row.UnitID.toString() !== 'NULL' ?  row.UnitID : <Chip label="Unscheduled" />}
                            </TableCell>

                            <TableCell>
                                < ChipLocation location={row.LocationID} /> {row.CUSTOMER}
                            </TableCell>

                            <TableCell>
                                { row.UnitID.toString() !== 'NULL' ? <ReasonBackOrderFile key={i} backOrderFile={row}/> : ''}
                            </TableCell>

                            <TableCell>
                                { row.UnitID.toString() !== 'NULL' ? <NoteUserBackOrderFile key={i} backOrderFile={row} /> : ''}
                            </TableCell>

                            <TableCell>
                                { row.UnitID.toString() !== 'NULL' ? <DateExpected key={i} backOrderFile={row} />: ''}
                            </TableCell>

                            <TableCell>
                                {
                                    row.newDateClient ?
                                        <Chip label={row.newDateClient?.toLocaleDateString()} color="primary" variant="outlined" size="small"/>
                                        : <Chip icon={<PendingActionsIcon />} label="Pending..." size="small"/>
                                }

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
