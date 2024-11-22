'use client';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SelectReason from '@/components/backorder/SelectReason';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function FormFilterBackOrder() {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Item>
          <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
            <TextField
              label="Order Number"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </FormControl>
          <FormControl sx={{ mx: 1, minWidth: 375 }} size="small">
            <TextField
              label="Customer"
              id="outlined-size-small"
              defaultValue=""
              size="small"
            />
          </FormControl>
          <SelectReason />
          <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
            <RadioGroup row aria-labelledby="rgLocation" name="rgLocation" defaultValue="ALL">
              <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
              <FormControlLabel value="MAIN" control={<Radio />} label="MAIN" />
              <FormControlLabel value="WAYNE" control={<Radio />} label="WAYNE" />
            </RadioGroup>
          </FormControl>
        </Item>
      </Grid>
    </Grid>
    // <Card sx={{ my: 1, minWidth: 275 }} variant="outlined">
    //   <CardContent sx={{ my: 0, minWidth: 275 }}>


    //   </CardContent>
    // </ Card>
  );
}