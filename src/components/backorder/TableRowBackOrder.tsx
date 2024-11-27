import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'

import FormBackOrder from './FormBackOrder'
import getBackOrders from "@/lib/data"
import { BackOrder } from '@/lib/definitions';
import CheckBackorder from '@/components/backorder/CheckBackOrder';

const label = { inputProps: { 'aria-label': 'Select record' } };

export let countBackOrder: number = 0


export default async function TableRowBackOrder({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const searchParams = await props.searchParams;
  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;

  console.log('props-tablerow', query, currentPage);

  const data: BackOrder[] = await getBackOrders(query, currentPage);
  const c: number = 1;
  countBackOrder = data.length
  return (
    <>
      {data.map((item, i) => {
        return (
          <TableRow hover key={i + c} style={{ backgroundColor: !item.UnitID ? '#ffcdd2' : '', }}>
            <TableCell sx={{ p: 0, m: 0 }}>
              {/* <CheckBackorder /> */}
            </TableCell>
            <TableCell>{i + c}</TableCell>
            <TableCell>{item.OrderNumber}</TableCell>
            <TableCell align='center'>{item.LineItem}</TableCell>
            <TableCell align='center'>{!item.UnitID ? <Chip label="Unscheduled" /> : item.UnitID}</TableCell>
            <TableCell>{item.CUSTOMER}</TableCell>
            <TableCell>{!item.UnitID ? '' : <FormBackOrder />}</TableCell>
            {/* <TableCell></TableCell> */}
          </TableRow>
        )
      })}
    </>
  );
}