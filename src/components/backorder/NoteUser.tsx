'use client'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


export default function NoteUser() {
  return (
    <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
      <TextField id="note" label="Notes" maxRows={1} size="small" multiline />
    </FormControl>
  );
};