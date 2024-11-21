'use client'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { reasonsBackOrder } from '@/lib/placeholder'


export default function SelectOptions() {
  return (
    <FormControl sx={{ mt: 0, mb: 0, minWidth: 120 }} size="small">
      <InputLabel id="lblreason">Reasons</InputLabel>
      <Select labelId="lblreason" id="reason" label="Reasons" value="">
        {reasonsBackOrder.map((item, index) => (
          <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}