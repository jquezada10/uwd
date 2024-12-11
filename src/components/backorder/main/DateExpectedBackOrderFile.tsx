'use client';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useDebouncedCallback } from 'use-debounce';
import { BackOrderGeneral } from "@/lib/definitions";
import { setExpDateBackOrderFile } from "@/lib/data";
import { startTransition } from "react";
import Chip from '@mui/material/Chip';
import { Stack } from '@mui/material';

type ClientAProps = {
  initialState: string;
  onStateChange: (newState: string) => void;
};

function formatDate(dateNew:string){
  console.log('------------------------------->', dateNew == '')
  if(dateNew !== ''){
    const fecha = new Date(dateNew );
    const dia = String(fecha.getDate()).padStart(2, '0');  
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');  
    const anio = fecha.getFullYear();
    const fechaFormateada = `${mes}/${dia}/${anio}`;
    return fechaFormateada
  }else{
    return 'Pending...'
  }
}

export default function DateExpected({ backOrderFile }: { backOrderFile: BackOrderGeneral }) {
  let expectDateFile = backOrderFile.expectedDate || '';
  let newExpectDateFile = backOrderFile.newDateClient || '';

  if (backOrderFile.expectedDate !== null) {
    expectDateFile = new Date(backOrderFile.expectedDate).toISOString().split("T")[0]
  }

  if (backOrderFile.newDateClient !== null) {
    newExpectDateFile = new Date(backOrderFile.newDateClient).toISOString().split("T")[0]
  }

  const [selectedDate, setSelectedDate] = React.useState(expectDateFile);
  const [newExpectedDate, setnewExpectedDate] = React.useState(formatDate(newExpectDateFile) || 'Pending');

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newExpectedDate = event.target.value;
    setSelectedDate(newExpectedDate);

    startTransition(() => {
      const res = setExpDateBackOrderFile(
        backOrderFile.codeBckOrd,
        backOrderFile.SchedID,
        backOrderFile.UnitID,
        backOrderFile.OrderNumber,
        new Date(newExpectedDate),
        backOrderFile.CustomerID,
      );
      setnewExpectedDate(res)
    });
  }

  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        type="Date"
        size="small"
        value={selectedDate}
        id={backOrderFile.codeBckOrd}
        onChange={handleInputChange}
      />

      <Chip
        icon={<PendingActionsIcon />}
        label={newExpectedDate}
        color="primary"
        variant="outlined"
        sx={{ py: 1.5, px: 1 }}
      />
    </Stack>
  );
}


// // app/components/ClientA.tsx (Client Component)
// 'use client';

// import React, { useState } from 'react';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

// type ClientAProps = {
//   initialState: string;
//   onStateChange: (newState: string) => void;
// };

// export const ClientA = ({ initialState, onStateChange }: ClientAProps) => {
//   const [state, setState] = useState(initialState);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newState = event.target.value;
//     setState(newState);
//     onStateChange(newState); // Invoca el callback para actualizar el estado compartido
//   };

//   return (
//     <div>
//       <h2>Componente A</h2>
//       <input type="text" value={state} onChange={handleChange} />
//     </div>
//   );
// };