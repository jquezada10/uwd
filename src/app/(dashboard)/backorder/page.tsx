'use server';
import * as React from 'react';
import { Suspense } from 'react';

import Chip from "@mui/material/Chip";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import { fetchBackOrdersView } from "@/lib/data";
import { BackOrder, BackOrderFile, BackOrderGeneral, FilterParams, SearchParams } from "@/lib/definitions";
import NoteUserBackOrderFile from "@/components/backorder/main/NoteUserBackOrderFile";
import ReasonBackOrderFile from "@/components/backorder/main/ReasonBackOrderFile";
import DateExpected from '@/components/backorder/main/DateExpectedBackOrderFile';
// import NewDateExpected from '@/components/backorder/NexDateExpected'
import FormFilterBackOrder from "@/components/backorder/filter/FormFilterBackOrder";
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Pagination from '@/components/backorder/ui/pagination';
import LoadingData from '@/components/backorder/ui/loadingData';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {formtLocalDate} from '@/lib/utils'
import Loading from '@/components/listbko';
import BackOrderTable from '@/components/backorder/main/BackOrderTable';


export default async function BackOrderPage(props: { searchParams?: Promise<FilterParams>}) {
    const fParams = await props.searchParams;
    const filters: FilterParams = {
        ord : fParams?.ord || '',
        pon : fParams?.ord || '',
        cus : fParams?.cus || '',
        loc : fParams?.loc || '',
        sch : fParams?.sch || '',
    }

    // const pag: number = Number(searchParams?.pag) || 1;
    // const ids: string | undefined = searchParams?.ids;
    // const rea: number[] = !ids ? [] : ids.split(',').map(Number);
    // let totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag,  });
    // status = false;
    // let totalPages = 1;
    //     console.log('haciendo todo por interno antes de mostrar el url cambiado')
    // let backorders: BackOrder[] = [];

    // // console.log('>>>>>', rea)

    // if (rea.length == 0 || rea[0] <= 3) {
    //     // console.log('100 ---- FILTRO SIN REASON', rea[0])
    //     if(rea[0] == 2){
    //         const files: Array<{}> = await fecthBackOrderFilesAll(rea)
    //         // console.log('Todas los BKOFiles', files);
    //         backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files});
    //         totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files});
        
    //     }else if(rea[0] == 3){
    //         const files: Array<{}> = await fecthBackOrderFilesAll(rea)
    //         // console.log('Todas los BKOFiles', files);
    //         const reas: number = rea[0];
    //         backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files, reas});
    //         totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files, reas});
    //     } else{   
    //         backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag});
    //         // console.log(pag)
    //         // backorders.map((i) => console.log(i.OrderNumber) )
    //         totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag});
    //     }
    // } else {
    //     // console.log('2------------------------------------------')
    //     const files: Array<{}> = await fecthBackOrderFiles(rea)
    //     // console.log('3........................', files);

    //     if (files.length != 0) {
    //         backorders = await fetchDBBackOrders({ ord, cus, loc, sch, pag, files });
    //         totalPages = await fetchBackOrdersPages({ ord, cus, loc, sch, pag, files });
    //     }
    // }

    // const bkoWithFile: BackOrderGeneral[] = await Promise.all(
    //     backorders.map(async (bko: BackOrder) => {
    //         // if(!bko.SchedID){
    //         //     const backOrderFile: BackOrderFile = {
    //         //         codeBckOrd: '',
    //         //         scheduleId: null,
    //         //         unitId: null,
    //         //         orderId: null,
    //         //         reasonId: null,
    //         //         noteUser: null,
    //         //         expectedDate: null,
    //         //         newDateClient: null
    //         //     };
    //         //     return {
    //         //         ...bko,
    //         //         ...backOrderFile,
    //         //     };
    //         // }else{
    //         const codeBackOrderFile: string = bko.SchedID + '-' + bko.UnitID + '-' + bko.OrderNumber + '-' + bko.LineItem;
    //         const backOrderFile: BackOrderFile = await fetchPrismaBackOrderFile(codeBackOrderFile);

    //         return {
    //             ...bko,
    //             ...backOrderFile,
    //         };
    //         // }
    //     })
    // );
    
    // backorders = await fetchBackOrdersView({ ord, cus, loc, sch, pag });


    return (
        <div>
            <FormFilterBackOrder />
            <BackOrderTable filters={filters}/>
        </div>
    );
}
