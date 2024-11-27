'use client';
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { reasonsBackOrder } from '@/lib/placeholder'
export default function ReasonComplete() {
  return (
    <Autocomplete
      id="reason"
      size="small"
      sx={{ width: 240 }}
      options={reasonsBackOrder}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (<TextField {...params} label="Reason" />)}
    />
  );
}