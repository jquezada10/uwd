import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'

import FormBackOrder from './FormBackOrder'
import getBackOrders from "@/lib/data"
import { BackOrder } from '@/lib/definitions';
import CheckBackorder from '@/components/backorder/CheckBackOrder';


function ChipLocation({location}:{location: string}){
  const locationOrd = location.at(0);
  if( locationOrd == 'M'){
    return <Chip size="small" label={locationOrd} color='success' />
  }
  if( locationOrd == 'W'){
    return <Chip size="small" label={locationOrd} color='error' />
  }
} 


export default async function TableRowBackOrder({
  order,
  customer,
  location,
  currentPage,
}: {
  order: string;
  customer: string;
  location: string;
  currentPage: number;
}) {

  const data: BackOrder[] = await getBackOrders(order, customer, location, currentPage);
  const c: number = 1;

  return (
    <>
      {data.map((item, i) => {
        return (
          <TableRow hover key={i + c} style={{ backgroundColor: !item.UnitID ? '#ffcdd2' : '', }}>
            <TableCell sx={{ p: 0, m: 0 }}>
              {/* <CheckBackorder /> */}
            </TableCell>

            <TableCell>
              {i + c}
            </TableCell>

            <TableCell>
              {item.OrderNumber}
            </TableCell>

            <TableCell align='center'>
              {item.LineItem}
            </TableCell>

            <TableCell align='center'>
              {!item.UnitID ? <Chip label="Unscheduled" /> : item.UnitID}
            </TableCell>

            <TableCell>
               < ChipLocation location={item.LocationID}/> {item.CUSTOMER}
            </TableCell>

            <TableCell>
              {!item.UnitID ? '' : <FormBackOrder />}
            </TableCell>
            
          </TableRow>
        )
      })}
    </>
  );
}