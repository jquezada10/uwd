'use client';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface NoteBackOrder {
  backorderId: string;
  noteUser: string;
  userLogin: string;
}

export default function NoteUser({ backorder, backOrderFile }: { backorder: {}, backOrderFile: string }) {
  console.log('desde note', backOrderFile)

  const [note, setNote] = React.useState('');

  function handlerFocus(e: any) {
    setMaxRows(maxRows + 10);
  }

  function handlerBlur(e: any) {
    setMaxRows(maxRows - 10);
  }

  async function fetchNoteBackOrder(noteBackOrder: NoteBackOrder) : Promise<void> {
    const promise = await fetch('/backorder/api/', {
      method: 'POST', 
      body: JSON.stringify(noteBackOrder),
      headers: { 'Content-Type': 'application/json'}
    })
      .then((response) => response.json())
      .then((json) => json);
    
    const dataResponse = await promise
    console.log(dataResponse)
  }

  const handleNote = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNote(event.target.value);
      const noteBackOrder: NoteBackOrder = {backorderId: backorder, noteUser: event.target.value, userLogin: 'jquezada10'}
      fetchNoteBackOrder(noteBackOrder);
    }, 300)

  const [maxRows, setMaxRows] = useState(1);

  return (
      <TextField
        fullWidth
        multiline
        id="noteUser"
        size="small"
        label="Notes"
        defaultValue={note}
        rows={maxRows}
        onBlur={handlerBlur}
        onFocus={handlerFocus}
        onChange={handleNote}
      />
  );
};