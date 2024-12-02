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
import { useDebouncedCallback } from 'use-debounce';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
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

  const [valueLocation] = React.useState('ALL');
  const [onlyUnscheduled, setOnlyUnscheduled] = React.useState(false);

  const handleFilterFields = useDebouncedCallback(
    (fieldName: string, fieldValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (fieldValue) {
      params.set(fieldName, fieldValue);
    } else {
      params.delete(fieldName);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleUnscheduled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyUnscheduled(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <Item>
          <FormControl sx={{ mr: 1, my: 1, minWidth: 120 }}>
            <TextField
              label="Order Number"
              id="outlined-size-small"
              size="small"
              onChange={(e) => { handleFilterFields('orderNumber', e.target.value); }}
              defaultValue={searchParams.get('orderNumber')?.toString()}
            />
          </FormControl>

          <FormControl sx={{ mr: 1, my: 1, minWidth: 320 }} size="small">
            <TextField
              label="Customer"
              id="outlined-size-small"
              size="small"
              onChange={(e) => { handleFilterFields('customerTitle', e.target.value); }}
              defaultValue={searchParams.get('customerTitle')?.toString()}
            />
          </FormControl>

          <SelectReason />

          <FormControl sx={{ mr: 1, my: 1, minWidth: 120 }} size="small">
            <RadioGroup row
              aria-labelledby="rgLocation"
              name="rgLocation"
              onChange={(e) => { handleFilterFields('locationOrd', e.target.value); }}
              defaultValue={valueLocation}
            >
              <FormControlLabel value="MAIN" control={<Radio />} label="Main" />
              <FormControlLabel value="WAYNE" control={<Radio />} label="Wayne" />
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ mr: 1, my: 1, minWidth: 120 }} size="small">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox 
                  checked={onlyUnscheduled}
                  onChange={handleUnscheduled}
                />} label="Only Unscheduled" />
            </FormGroup>
          </FormControl>
        </Item>
      </Stack>
    </Box>
  );
}