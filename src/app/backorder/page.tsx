'use server'
// import {fetchLatestOrders} from '@/lib/data'
// import { Order } from '@/lib/definitions';
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';

import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';

import SelectReason from '@/components/backorder/SelectReason';
import NoteUser from '@/components/backorder/NoteUser'
import DateSelect from '@/components/backorder/DateSelect'
import FilterLocation from '@/components/backorder/FilterLocation'

// export default async function Page() { 
//   const lastOrders: Order[] = (await fetchLatestOrders()).ordernes;
//   return(
//     <div>
//     <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Order Number</TableCell>
//                 <TableCell>PO Number</TableCell>
//                 <TableCell>Quote Number(g)</TableCell>
//                 <TableCell>Ordered Date</TableCell>
//                 <TableCell>Dealer Name</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {lastOrders.map((row, i) => (
//                 <TableRow
//                   key={i}
//                   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">{row.OrderNumber}</TableCell>
//                   <TableCell align="right">{row.PONumber}</TableCell>
//                   <TableCell align="right">{row.QuoteNumber}</TableCell>
//                   <TableCell align="right">{row.OrderedDate}</TableCell>
//                   <TableCell align="right">{row.DealerName}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//     </div>
//   );
// }

import getBackOrders from "@/lib/data"
import { BackOrder, Reason } from '@/lib/definitions';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default async function BackOrdersMain() {
  let indexrow: number = 1;
  const data: BackOrder[] = await getBackOrders()
  return (
    <div>
      <Paper elevation={3} />
        <FilterLocation />
      <Paper />
      <br />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>#</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Line</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox {...label} />
                  </TableCell>
                  <TableCell>{indexrow + index}</TableCell>
                  <TableCell>{row.OrderNumber}</TableCell>
                  <TableCell>{row.LineItem}</TableCell>
                  <TableCell>{row.UnitID}</TableCell>
                  <TableCell>{row.CUSTOMER}</TableCell>
                  <TableCell>
                    <div>
                      <SelectReason />
                      <NoteUser />
                      <DateSelect />
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <TextField id="expectdate" label="" size="small" type="Date" slotProps={{ input: { readOnly: true, }, }} />
                      </FormControl>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </div>
  );
}