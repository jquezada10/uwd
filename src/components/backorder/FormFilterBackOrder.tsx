'use client';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SelectReason from '@/components/backorder/SelectReason';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'justify',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function FormFilterBackOrder() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <TextField
              label="Order Number"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 320 }} size="small">
            <TextField
              label="Customer"
              id="outlined-size-small"
              size="small"
              onChange={(e) => {handleSearch(e.target.value);}}
              defaultValue={searchParams.get('query')?.toString()}
            />
          </FormControl>
          <SelectReason />
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <RadioGroup row aria-labelledby="rgLocation" name="rgLocation" defaultValue="ALL">
              <FormControlLabel value="ALL" control={<Radio />} label="All" />
              <FormControlLabel value="MAIN" control={<Radio />} label="Main" />
              <FormControlLabel value="WAYNE" control={<Radio />} label="Wayne" />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Unscheduled" />
            </FormGroup>
          </FormControl>
        </Item>
      </Stack>
    </Box>
  );
}