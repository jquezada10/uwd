'use client';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { setNoteUserBackOrderFile } from '@/lib/data';
import { BackOrderGeneral } from '@/lib/definitions';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

export default function NoteUserBackOrderFile({
    backOrderFile,
}: {
    backOrderFile: BackOrderGeneral;
}) {
    const [isPending, startTransition] = React.useTransition();
    const [maxRows, setMaxRows] = React.useState(1);
    const [note, setNote] = React.useState(backOrderFile.noteUser || '');

    function handlerFocus(): void {
        setMaxRows(maxRows + 10);
    }

    function handlerBlur(): void {
        setMaxRows(maxRows - 10);
    }

    const handleInputChange = useDebouncedCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const newNoteUser = event.target.value;
            setNote(newNoteUser);

            startTransition(() => {
                setNoteUserBackOrderFile(
                    backOrderFile.codeBckOrd,
                    backOrderFile.SchedID,
                    backOrderFile.UnitID,
                    backOrderFile.OrderNumber,
                    newNoteUser
                );
            });
        },
        300
    );

    return (
        <div>
            <TextField
                fullWidth
                multiline
                size='small'
                label='Notes'
                rows={maxRows}
                defaultValue={note}
                onBlur={handlerBlur}
                onFocus={handlerFocus}
                onChange={handleInputChange}
            />
            {isPending && <LinearProgress />}
        </div>
    );
}
