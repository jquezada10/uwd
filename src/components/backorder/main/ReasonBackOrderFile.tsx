'use client';
import React, { startTransition } from 'react';
import { BackOrderGeneral } from '@/lib/definitions';
import { reasonsBackOrder } from '@/lib/placeholder';
import { setReasonBackOrderFile } from '@/lib/data';
import Autocomplete, {
    AutocompleteRenderInputParams,
} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface ReasonOption {
    id: number;
    title: string;
}

export default function ReasonBackOrderFile({
    backOrderFile,
}: {
    backOrderFile: BackOrderGeneral;
}) {
    const options: ReasonOption[] = reasonsBackOrder.filter(
        (item: ReasonOption) => item.id > 3
    );
    const idToFind = backOrderFile.reasonId;
    const foundObject = options.find((obj) => obj.id === idToFind);
    const [value, setValue] = React.useState<ReasonOption | null>(
        foundObject || null
    );

    const handleInputChange = (
        event: React.SyntheticEvent,
        newValue: ReasonOption | null
    ) => {
        setValue(newValue);

        if (newValue !== null) {
            startTransition(() => {
                setReasonBackOrderFile(
                    backOrderFile.codeBckOrd,
                    backOrderFile.SchedID,
                    backOrderFile.UnitID,
                    backOrderFile.OrderNumber,
                    newValue.id
                );
            });
        }
    };

    return (
        <div>
            <Autocomplete
                size='small'
                value={value}
                options={options}
                onChange={handleInputChange}
                id={backOrderFile.codeBckOrd}
                getOptionLabel={(option: ReasonOption): string => option.title}
                renderInput={(params: AutocompleteRenderInputParams) => (
                    <TextField
                        {...params}
                        label='Reason Backorder'
                    />
                )}
            />
        </div>
    );
}
