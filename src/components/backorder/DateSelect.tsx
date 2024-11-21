'use client'
import * as React from 'react';
import { Dayjs } from 'dayjs';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function DateExpected() {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  return (
      <FormControl sx={{ mt: 0, mb: 0, minWidth: 120 }} size="small">
        <TextField id="expectdate" label="" size="small" type="Date" slotProps={{ input: { readOnly: false, }, }} />
      </FormControl>
  );
}