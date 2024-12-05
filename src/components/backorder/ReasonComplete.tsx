'use client';
import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { reasonsBackOrder } from '@/lib/placeholder';

interface Option {
  id: number;
  title: string;
}


export default function ReasonComplete({ backorderFile }: { backorderFile: object }) {
  const options: Option[] = reasonsBackOrder.filter((item) => item.id > 3);
  const [selectedOption, setSelectedOption] = React.useState<Option | null>(null);

  React.useEffect(() => {
    fetch('/backorder/api/1')
      .then((res) => res.json)
      .then((data) => {
        set
      })
  }, []);

  const handleChange = async (event: React.ChangeEvent<{}>, newValue: Option | null) => {
    setSelectedOption(newValue);
    const data = {
      'backorderFile': backorderFile,
      'reasonId': newValue?.id,
      'reasonTitle': newValue?.title
    }

    const promise = await fetch('/backorder/api/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })

    const res = await promise.json()
    console.log('server-res', res)
  };

  return (
    <Autocomplete
      size="small"
      id="reasonId"
      options={options}
      value={selectedOption}
      onChange={handleChange}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => <TextField {...params} label="Reason Backorder" />}
    />
  );
};
