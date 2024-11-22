'use client';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

export default function NoteUser() {
  function handlerFocus(e: any){
    setMaxRows(maxRows + 10);
  } 
  
  function handlerBlur(e: any){
    setMaxRows(maxRows - 10);
  }  
  
  function handlerDoubleClick(e: any){
    setMaxRows(maxRows - 10);
  }
  
  const [maxRows, setMaxRows] = useState(1);

  return (
    <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
      <TextField
        id="note" name="note" label="Notes"
        size="small" rows={maxRows} multiline
        onFocus={handlerFocus} onBlur={handlerBlur} 
        onDoubleClick={handlerDoubleClick}/>
    </FormControl>
  );
};