'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDebouncedCallback } from 'use-debounce';
import {BackOrderGeneral} from "@/lib/definitions";
import {setExpDateBackOrderFile} from "@/lib/data";
import {startTransition} from "react";


export default function DateExpected({ backOrderFile }: { backOrderFile: BackOrderGeneral }) {
  let expectDateFile =  backOrderFile.expectedDate || '';

  if (backOrderFile.expectedDate !== null){
    expectDateFile = new Date(backOrderFile.expectedDate).toISOString().split("T")[0]
  }

  const [selectedDate, setSelectedDate] = React.useState(expectDateFile);

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExpectedDate = event.target.value;
    setSelectedDate(newExpectedDate);

    startTransition(() => {
      setExpDateBackOrderFile(
          backOrderFile.codeBckOrd,
          backOrderFile.SchedID,
          backOrderFile.UnitID,
          backOrderFile.OrderNumber,
          new Date(newExpectedDate),
      );
    });
  }

  return (
    <TextField
      fullWidth
      type="Date"
      size="small"
      value={selectedDate}
      id={backOrderFile.codeBckOrd}
      onChange={handleInputChange}
    />
  );
}