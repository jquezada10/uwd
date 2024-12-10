'use client';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import FilterReasonSelect from '../FilterReasonSelect';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function FormFilterBackOrder() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilterFields = useDebouncedCallback(
        (fieldName: string, fieldValue: string) => {
            const params = new URLSearchParams(searchParams);
            params.set('page', '1');
            if (fieldValue) {
                params.set(fieldName, fieldValue);
            } else {
                params.delete(fieldName);
            }
            replace(`${pathname}?${params.toString()}`);
        }, 300);


    // location
    const filter = searchParams.get('loc');
    const [selectedLocation, setSelectedLocation] = React.useState(filter || 'ALL');
    const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        const value = event.target.value;
        setSelectedLocation(value);
        params.set('page', '1');
        params.set('loc', value);
        replace(`${pathname}?${params}`);
    }


    // only-unscheduled
    const initialChecked = searchParams.get('sch') === 'true';
    const [onlyUnscheduled, setOnlyUnscheduled] = React.useState<boolean>(initialChecked);
    const handleChangeUnscheduled = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setOnlyUnscheduled(checked);

        const params = new URLSearchParams(searchParams.toString());
        if (checked) {
            params.set('page', '1');
            params.set('sch', 'true');
        } else {
            params.set('page', '1');
            params.set('sch', 'false');
        }
        replace(`${pathname}?${params}`);
    };

    return (
        <Card variant="outlined" sx={{ py: 1, mb: 1 }} >
            <Typography variant="overline" gutterBottom sx={{ display: 'block' , m:0, fontWeight: 600}}>
                Backorders filters
            </Typography>
            <Stack
                direction="row"
                spacing={0.5}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <TextField
                    size="small"
                    fullWidth={true}
                    label="Order Number"
                    onChange={(e) => { handleFilterFields('ord', e.target.value); }}
                    defaultValue={searchParams.get('orderNumber')?.toString()}
                />

                <TextField
                    size="small"
                    label="Customer"
                    fullWidth={true}
                    onChange={(e) => { handleFilterFields('cus', e.target.value); }}
                    defaultValue={searchParams.get('customerTitle')?.toString()}
                />

                <FilterReasonSelect />

                <FormControl fullWidth>
                    <RadioGroup row value={selectedLocation} onChange={handleChangeLocation}
                        sx={{ justifyContent: "space-between", alignItems: "center", }}>
                        <FormControlLabel value="ALL" control={
                            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 22, }, }} />} label="All" />
                        <FormControlLabel value="MAIN" control={
                            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 22, }, }} />} label="Main" />
                        <FormControlLabel value="WAYNE" control={
                            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 22, }, }} />} label="Wayne" />
                    </RadioGroup>
                </FormControl>

                <FormControl fullWidth sx={{ justifyContent: "space-between", alignItems: "center", }}>
                    <FormControlLabel
                        label="Only Unscheduled"
                        control={
                            <Checkbox
                                checked={onlyUnscheduled} onChange={handleChangeUnscheduled}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }} />
                        }
                    />
                </FormControl>
            </Stack>
        </Card>
    );
}