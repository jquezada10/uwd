import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import SelectReason from '@/components/backorder/SelectReason';

export default function RowRadioButtonsGroup() {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <TextField
          label="Order Number"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <TextField
          label="Customer"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
      </FormControl>
      <SelectReason />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        {/* <FormLabel id="demo-row-radio-buttons-group-label">Location</FormLabel> */}
        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" >
          <FormControlLabel value="ALL" control={<Radio />} label="ALL" />
          <FormControlLabel value="MAIN" control={<Radio />} label="MAIN" />
          <FormControlLabel value="WAYNE" control={<Radio />} label="WAYNE" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}