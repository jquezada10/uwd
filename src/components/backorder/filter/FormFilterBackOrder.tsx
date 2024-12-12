'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import FilterReasonSelect from '@/components/backorder/filter/FilterReasonSelect';

export default function FormFilterBackOrder() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilterFields = useDebouncedCallback(
        (fieldName: string, fieldValue: string) => {
            const params = new URLSearchParams(searchParams);
            params.set('pag', '1');
            if (fieldValue) {
                params.set(fieldName, fieldValue);
            } else {
                params.delete(fieldName);
            }
            replace(`${pathname}?${params.toString()}`);
        },
        300
    );

    // location
    const filter = searchParams.get('loc');
    const [selectedLocation, setSelectedLocation] = React.useState(filter || 'ALL');
    const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedLocation(value);

        const params = new URLSearchParams(searchParams.toString());
        value != 'ALL' ? params.set('loc', value) : params.delete('loc');
        replace(`${pathname}?${params}`);
    };

    // only-unscheduled
    const initialChecked = searchParams.get('sch') === 'true';
    const [onlyUnscheduled, setOnlyUnscheduled] =
        React.useState<boolean>(initialChecked);
    const handleChangeUnscheduled = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 1.
        const checked = event.target.checked;
        setOnlyUnscheduled(checked);
        // 2.
        const params = new URLSearchParams(searchParams);
        checked ? params.set('sch', 'true') : params.delete('sch');
        replace(`${pathname}?${params}`);
    };

    return (
        <Card
            variant='outlined'
            sx={{ py: 1, mb: 1 }}
        >
            <Typography
                variant='overline'
                gutterBottom
                sx={{ display: 'block', m: 0, fontWeight: 600 }}
            >
                Backorders filters
            </Typography>
            <Stack
                direction='row'
                spacing={0.5}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <TextField
                    size='small'
                    sx={{ width: 600 }}
                    label='Order Number'
                    onChange={(e) => {
                        handleFilterFields('ord', e.target.value);
                    }}
                    defaultValue={searchParams.get('orderNumber')?.toString()}
                />

                <TextField
                    size='small'
                    sx={{ width: 600 }}
                    label='Purchase Order'
                    onChange={(e) => {
                        handleFilterFields('ord', e.target.value);
                    }}
                    defaultValue={searchParams.get('orderNumber')?.toString()}
                />

                <TextField
                    size='small'
                    label='Customer'
                    fullWidth={true}
                    onChange={(e) => {
                        handleFilterFields('cus', e.target.value);
                    }}
                    defaultValue={searchParams.get('customerTitle')?.toString()}
                />

                <FilterReasonSelect />

                <FormControl sx={{ width: 900 }}>
                    <RadioGroup
                        row
                        value={selectedLocation}
                        onChange={handleChangeLocation}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <FormControlLabel
                            value='ALL'
                            control={
                                <Radio
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                />
                            }
                            label='All'
                        />
                        <FormControlLabel
                            value='MAIN'
                            control={
                                <Radio
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                />
                            }
                            label='Main'
                        />
                        <FormControlLabel
                            value='WAYNE'
                            control={
                                <Radio
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                />
                            }
                            label='Wayne'
                        />
                    </RadioGroup>
                </FormControl>

                <FormControl
                    fullWidth
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <FormControlLabel
                        label='Only Unscheduled'
                        control={
                            <Checkbox
                                checked={onlyUnscheduled}
                                onChange={handleChangeUnscheduled}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                            />
                        }
                    />
                </FormControl>
            </Stack>
        </Card>
    );
}
