'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {reasonsBackOrder} from '@/lib/placeholder';

interface Props {
  id: number;
  title: string;
}

export default function ReasonComplete() {
  function handleInputChange(value) {
    console.log(value);
  }

  return (
    <Autocomplete
      id="combo-box-demo"
      options={reasonsBackOrder}
      getOptionLabel={(option: Props) => option.title}
      style={{ width: 300 }}
      onInputChange={handleInputChange}
      renderInput={params => (
        <TextField {...params} label="Combo box" variant="outlined" fullWidth />
      )}
    />
  );
}
