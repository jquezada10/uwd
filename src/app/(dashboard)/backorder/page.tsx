'use server';
import * as React from 'react';
import { Suspense } from 'react';
import crypto from 'crypto';
import Chip from "@mui/material/Chip";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { fecthBackOrderFiles, fetchBackOrdersPages, fetchDBBackOrders, fetchPrismaBackOrderFile, fecthBackOrderFilesAll } from "@/lib/data";
import { BackOrder, BackOrderFile, BackOrderGeneral, SearchParams } from "@/lib/definitions";
import NoteUserBackOrderFile from "@/components/backorder/NoteUserBackOrderFile";
import ReasonBackOrderFile from "@/components/backorder/ReasonBackOrderFile";
import DateExpected from '@/components/backorder/DateExpected';
// import NewDateExpected from '@/components/backorder/NexDateExpected'
import FormFilterBackOrder from "@/components/backorder/filter/FormFilterBackOrder";
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Pagination from '@/components/backorder/ui/pagination';
import LoadingData from '@/components/backorder/ui/loadingData';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {formtLocalDate} from '@/lib/utils'

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


function formatDate(dateNew:string){
    if(dateNew !== ''){
      const fecha = new Date(dateNew );
      const dia = String(fecha.getDate()).padStart(2, '0');  
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');  
      const anio = fecha.getFullYear();
      const fechaFormateada = `${mes}/${dia}/${anio}`;
      return fechaFormateada
    }else{
      return 'Pending...'
    }
  }



let status = false;

export default async function BackOrderPage(
    props: {
        searchParams?: Promise<{
            ord?: string;
            cus?: string;
            loc?: string,
            pag?: string;
            sch?: string
            ids?: string
        }>,
    }) {
    status = true;
    const searchParams = await props.searchParams;
    const ord: string = searchParams?.ord || '';
    const cus: string = searchParams?.cus || '';
    const loc: string = searchParams?.loc || 'ALL';
    const sch: string = searchParams?.sch || '';
    const pag: number = Number(searchParams?.pag) || 1;
    const ids: string | undefined = searchParams?.ids;
    const rea: number[] = !ids ? [] : ids.split(',').map(Number);
    // let totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag,  });
    status = false;
    let totalPages = 1;

    let backorders: BackOrder[] = [];

    // console.log('>>>>>', rea)

    if (rea.length == 0 || rea[0] <= 3) {
        // console.log('100 ---- FILTRO SIN REASON', rea[0])
        if(rea[0] == 2){
            const files: Array<{}> = await fecthBackOrderFilesAll(rea)
            // console.log('Todas los BKOFiles', files);
            backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files});
            totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files});
        
        }else if(rea[0] == 3){
            const files: Array<{}> = await fecthBackOrderFilesAll(rea)
            // console.log('Todas los BKOFiles', files);
            const reas: number = rea[0];
            backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files, reas});
            totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files, reas});
        } else{   
            backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag});
            // console.log(pag)
            // backorders.map((i) => console.log(i.OrderNumber) )
            totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag});
        }
    } else {
        // console.log('2------------------------------------------')
        const files: Array<{}> = await fecthBackOrderFiles(rea)
        // console.log('3........................', files);

        if (files.length != 0) {
            backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files });
            totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files });
        }
    }

    const bkoWithFile: BackOrderGeneral[] = await Promise.all(
        backorders.map(async (bko: BackOrder) => {
            // if(!bko.SchedID){
            //     const backOrderFile: BackOrderFile = {
            //         codeBckOrd: '',
            //         scheduleId: null,
            //         unitId: null,
            //         orderId: null,
            //         reasonId: null,
            //         noteUser: null,
            //         expectedDate: null,
            //         newDateClient: null
            //     };
            //     return {
            //         ...bko,
            //         ...backOrderFile,
            //     };
            // }else{
            const codeBackOrderFile: string = bko.SchedID + '-' + bko.UnitID + '-' + bko.OrderNumber + '-' + bko.LineItem;
            const backOrderFile: BackOrderFile = await fetchPrismaBackOrderFile(codeBackOrderFile);

            return {
                ...bko,
                ...backOrderFile,
            };
            // }
        })
    );
    return (
        <div>
            <FormFilterBackOrder />
            {/* <LoadingData pendiente={status} /> */}
            
            <TableContainer component={Paper}>
                <Table aria-label="backorder-main" size="small">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell sx={{ width: 10 }}>All</TableCell> */}
                            <TableCell sx={{ width: 10, fontWeight: 650}}>#</TableCell>
                            <TableCell sx={{ width: 10, fontWeight: 650}}>Order</TableCell>
                            <TableCell sx={{ width: 10, fontWeight: 650}}>Line</TableCell>
                            <TableCell sx={{ width: 10, fontWeight: 650}}>Unit</TableCell>
                            <TableCell sx={{ fontWeight: 650}}>Customer</TableCell>
                            <TableCell sx={{ fontWeight: 650, width: 350}}>Reason</TableCell>
                            <TableCell sx={{ fontWeight: 650}}>Notes</TableCell>
                            <TableCell sx={{ width: 10, fontWeight: 650}}>Material/Part Expected Date</TableCell>
                            <TableCell sx={{ width: 10, fontWeight: 650}}>Customer Expected Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bkoWithFile.map((row: BackOrderGeneral, i: number) => (
                            
                                <TableRow key={generateKey()}>
                                    {/* <TableCell>
                                    #
                                </TableCell> */}

                                    <TableCell>
                                        {i + 1}
                                    </TableCell>

                                    <TableCell>
                                        <a href={`http://uwd-fvsql/BI/reportviewer.aspx?report=331&order=${row.OrderNumber}`} target='_blank'>{row.OrderNumber}</a>
                                        {/* {row.OrderNumber} */}
                                    </TableCell>

                                    <TableCell>
                                        {row.LineItem}
                                    </TableCell>

                                    <TableCell>
                                        {row.UnitID ? row.UnitID : <Chip label="Unscheduled" color='error'/>}
                                    </TableCell>

                                    <TableCell sx={{ fontWeight: 650}}>
                                        < ChipLocation location={row.LocationID} /> 
                                        <span>{row.CUSTOMER}</span> <br />
                                        <span>
                                            <LocalShippingIcon fontSize="small" sx={{ pt:0.5, mx:1}}/>
                                            Target Ship Date: {formtLocalDate(row.TargetShipDate.toISOString().split("T")[0])}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        {row.UnitID ? <ReasonBackOrderFile key={generateKey()} backOrderFile={row} /> : ''}
                                    </TableCell>

                                    <TableCell>
                                        {row.UnitID ? <NoteUserBackOrderFile key={generateKey()} backOrderFile={row} /> : ''}
                                    </TableCell>

                                    <TableCell colSpan={2}>
                                        {row.UnitID ? <DateExpected key={generateKey()} backOrderFile={row} /> : ''}
                                    </TableCell>

                                    {/* <TableCell> */}
                                    {/* <NewDateExpected state={sharedState} /> */}
                                    {/* { */}
                                    {/* row.newDateClient ? */}
                                    {/* <Chip label={row.newDateClient?.toLocaleDateString('en-US', { timeZone: 'UTC' })} color="primary" variant="outlined" size="small" /> */}
                                    {/* : <Chip icon={<PendingActionsIcon />} label="Pending..." size="small" /> */}
                                    {/* // } */}
                                    {/* </TableCell> */}
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
                        <span><Chip size="small" label='W : WAYNE' color='primary' /></span>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
