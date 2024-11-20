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
import { BackOrder } from '@/lib/definitions';

export default async function BackOrdersMain(){
  const data: BackOrder[] = await getBackOrders()
  return(
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Order Info</TableCell>
            <TableCell>Dates Order</TableCell>
            <TableCell>Location / Target Shipp</TableCell>
            <TableCell>SiteID</TableCell>
            <TableCell>CustomerRef</TableCell>
            <TableCell>PONumber</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>ReqDate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>Order: {row.oKey} <br /> Customer: {row.CustomerID}</TableCell>
              <TableCell>Ack Date: {row.AckDate.toLocaleDateString()} <br /> Req Date: {row.ReqDate.toLocaleDateString()}</TableCell>
              <TableCell>SPRINGFIELD <br /> 00/00/0000</TableCell>
              <TableCell>{row.SiteID}</TableCell>
              <TableCell>{row.CustomerID}</TableCell>
              <TableCell>{row.PONumber}</TableCell>
              <TableCell>{row.Date.toLocaleDateString()}</TableCell>
              <TableCell>{row.ReqDate.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
  </Paper>
  );
}