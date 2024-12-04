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
import FilterReasonSelect from './FilterReasonSelect';

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
    // console.log(event.target.checked);
    if (event.target.checked) {
      handleFilterFields('schdle', 'true');
    } else {
      handleFilterFields('schdle', 'false');
    }
  };

  return (
    <>
      <TextField
        size="small"
        fullWidth={true}
        label="Order Number"
        onChange={(e) => { handleFilterFields('orderNumber', e.target.value); }}
        defaultValue={searchParams.get('orderNumber')?.toString()}
      />

      <TextField
        size="small"
        label="Customer"
        fullWidth={true}
        onChange={(e) => { handleFilterFields('customerTitle', e.target.value); }}
        defaultValue={searchParams.get('customerTitle')?.toString()}
      />

      <FilterReasonSelect />

      <FormControl fullWidth={true}>
        <RadioGroup row
          defaultValue={valueLocation}
          aria-labelledby="rgLocation"
          onChange={(e) => { handleFilterFields('locationOrd', e.target.value); }}
        >
          <FormControlLabel value="ALL" control={
            <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 22,},}}/>} label="All" />
          <FormControlLabel value="MAIN" control={
            <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 22,},}}/>} label="Main" />
          <FormControlLabel value="WAYNE" control={
            <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 22,},}}/>} label="Wayne" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth={true}>
        <FormControlLabel
          label="Only Unscheduled"
          control={
            <Checkbox
              checked={onlyUnscheduled} onChange={handleUnscheduled}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }} />
          }
        />
      </FormControl>
    </>
  );
}