'use client';
import SelectReason from '@/components/backorder/SelectReason';
import NoteUser from '@/components/backorder/NoteUser';
import DateExpected from '@/components/backorder/DateExpected';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function Page() {
  return (
    <form>
      <SelectReason />
      <NoteUser />
      <DateExpected />
      <FormControl sx={{mx:1, minWidth: 120 }} size="small">
        <TextField id="newdexpectdate" label="" size="small"
         type="Date" slotProps={{ input: { readOnly: true, disabled: true}, }} />
      </FormControl>
    </form>
  );
}