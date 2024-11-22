'use client'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import FormBackOrder from './FormBackOrder'
import Chip from '@mui/material/Chip'

const label = { inputProps: { 'aria-label': 'Select record' } };

export default function TableRowBackOrder({ item, index}: { item: any, index: number}) {
  const i: number = index + 1;
  return(
    <TableRow key={i} style={{backgroundColor: !item.UnitID ? '#ffcdd2' : '',}}>
      <TableCell><Checkbox {...label} /></TableCell>
      <TableCell>{i}</TableCell>
      <TableCell>{item.OrderNumber}</TableCell>
      <TableCell align='center'>{item.LineItem}</TableCell>
      <TableCell align='center'>{ !item.UnitID ? <Chip label="Unscheduled" />: item.UnitID}</TableCell>
      <TableCell>{item.CUSTOMER}</TableCell>
      <TableCell>{ !item.UnitID ? '' : <FormBackOrder />}</TableCell>
    </TableRow>
  );
}