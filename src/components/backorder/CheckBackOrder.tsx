'use client';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';


export let selectedArray: object[] = []

export default function CheckBackOrder() {
  console.log('Init...');
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    selectedArray.push({'value': event.target.value})
  };

  return (
    <Checkbox
      value = 'UWDProject'
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}