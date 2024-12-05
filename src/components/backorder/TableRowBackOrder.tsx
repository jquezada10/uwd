import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack';
import FormBackOrder from './FormBackOrder'
import getBackOrders from "@/lib/data"
import { BackOrder } from '@/lib/definitions';
import CheckBackorder from '@/components/backorder/CheckBackOrder';
import ReasonComplete from './ReasonComplete';
import NoteUser from '@/components/backorder/NoteUser';
import DateExpected from '@/components/backorder/DateExpected';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function ChipLocation({ location }: { location: string }) {
  const locationOrd = location.at(0);
  if (locationOrd == 'M') {
    return <Chip size="small" label={locationOrd} color='success' />
  }
  if (locationOrd == 'W') {
    return <Chip size="small" label={locationOrd} color='error' />
  }
}

export default async function TableRowBackOrder({
  order,
  customer,
  location,
  schdle,
  currentPage,
}: {
  order: string;
  customer: string;
  location: string;
  schdle: string;
  currentPage: number;
}) {

  const data: BackOrder[] = await getBackOrders(order, customer, location, currentPage, schdle);
  const c: number = 1;

  return (
    <>
      {data.map((item, i) => {
        const codeBckOrd : string = item.SchedID+'-'+item.UnitID+'-'+item.OrderNumber;
        const BackorderFile = {
          codeBckOrd: codeBckOrd,
          scheduleId: item.SchedID,
          unitId: item.UnitID,
          orderId: item.OrderNumber
        }
        return (
          <TableRow hover key={i + c} style={{ backgroundColor: !item.UnitID ? '#ffcdd2' : '', }}>
            <TableCell sx={{ p: 0, m: 0 }}>
              {/* <CheckBackorder /> */}
            </TableCell>

            <TableCell>
              {i + c}
            </TableCell>

            <TableCell>
              <a href={`http://uwd-fvsql/BI/reportviewer.aspx?report=331&order=${item.OrderNumber}`} target='_blank'>{item.OrderNumber}</a>
            </TableCell>

            <TableCell align='center'>
              {item.LineItem}
            </TableCell>

            <TableCell align='center'>
              {!item.UnitID ? <Chip label="Unscheduled" /> : item.UnitID}
            </TableCell>

            <TableCell>
              < ChipLocation location={item.LocationID} /> {item.CUSTOMER}
            </TableCell>

            <TableCell>
              {!item.UnitID ? '' : <Stack minWidth={320}><ReasonComplete backorderFile={BackorderFile}/></Stack>}
            </TableCell>

            <TableCell>
              {!item.UnitID ? '' : <Stack minWidth={300}><NoteUser backorder={codeBckOrd}/></Stack>}
            </TableCell>

            <TableCell>
              {!item.UnitID ? '' : <Stack minWidth={70}><DateExpected backorder={codeBckOrd}/></Stack>}
            </TableCell>

            <TableCell>
              {/* {!item.UnitID ? '' : <Stack minWidth={70}><DateExpected /></Stack>} */}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  );
}