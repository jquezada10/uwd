'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDebouncedCallback } from 'use-debounce';

interface ExpDateBackOrder {
  backorderId: string;
  expectedDate: string;
  userLogin: string;
}

export default function DateExpected({ backorder }: { backorder: string }) {
  const [expDate, setExpDate] = React.useState('')

  async function fetchExpDateBackOrder(expDateBackOrder: ExpDateBackOrder) : Promise<void> {
    const promise = await fetch('/backorder/api/', {
      method: 'POST', 
      body: JSON.stringify(expDateBackOrder),
      headers: { 'Content-Type': 'application/json'}
    })

    const dataResponse = await promise.json()
    console.log(dataResponse)
  }

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpDate(event.target.value);
      const expDateBackOrder: ExpDateBackOrder = {
        backorderId: backorder, 
        expectedDate: event.target.value, 
        userLogin: 'jquezada10'
      };
      fetchExpDateBackOrder(expDateBackOrder);
    }, 300)

  return (
    <TextField
      fullWidth
      type="Date"
      size="small"
      id="expectedDate"
      defaultValue={expDate}
      onChange={handleChange}
    />
  );
}