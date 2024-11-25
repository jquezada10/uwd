'use client';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { reasonsBackOrder } from '@/lib/placeholder'

export default function SelectOptions() {

  const [reason, setReason] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setReason(event.target.value as string);
  };

  return (
    <FormControl sx={{ mx: 1, minWidth: 240 }} size="small">
      <InputLabel id="lblreason">Reasons</InputLabel>
      <Select labelId="lblreason" id="reason"
        label="Reasons" value={reason}
        onChange={handleChange}>
        {
        reasonsBackOrder.map((item, index) => (
          <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
        ))
        }
      </Select>
    </FormControl>
  );
}