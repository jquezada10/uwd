'use client';
import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import {
    fetchVendorsByOrder,
    fetchReasonCatergoryByVendor,
    fetchDescriptionReasons,
} from '@/lib/actions';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import NoteUserBackOrderFile from './NoteUserBackOrderFile';
import { generateKey } from '@/lib/utils';

interface Vendor {
    id: number;
    name: string;
}

interface ReasonCategory {
    id: number;
    nameCategory: string;
    codeCategory: string;
}

interface DescriptionReason {
    id: number;
    nameDescription: string;
    notesRequeried: boolean;
}

export default function BackOrderFileParent() {
    const [loading, setLoading] = React.useState(false);
    const [legent, setLegent] = React.useState(false);
    // 1 vendor-select
    const [vendor, setVendor] = React.useState<Vendor[]>([]);
    const [selectedVendor, setSelectedVendor] = React.useState('');
    const fetchVendors = async () => {
        setLoading(true);
        try {
            const response = await fetchVendorsByOrder('codeBackOrderFile');
            setVendor(response);
        } catch (error) {
            console.error('Error: Load VendorByOrder:', error);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };
    const handleChangeVendor = (event: SelectChangeEvent<string>) => {
        setSelectedVendor(event.target.value);
        fetchReasons(event.target.value);
    };

    // 2 reason-select
    const [reasonCategory, setReasonCategory] = React.useState<ReasonCategory[]>([]);
    const [selectedReason, setSelectedReason] = React.useState('');
    const fetchReasons = async (vendorName: string) => {
        setLoading(true);
        try {
            const response = await fetchReasonCatergoryByVendor(vendorName);
            setReasonCategory(response);
        } catch (error) {
            console.error('Error: Load Reasons Category', error);
        } finally {
            setLoading(false);
        }
    };
    const handleChangeReason = (event: SelectChangeEvent<string>) => {
        setSelectedReason(event.target.value);
        fetchDescripstionReason(Number(event.target.value.toString()));
    };

    // 3 description-select
    const [descriptionReason, setDescriptionReason] = React.useState<
        DescriptionReason[]
    >([]);
    const [selectedDescription, setSelectedDescription] = React.useState('');
    const fetchDescripstionReason = async (resonCategory: number) => {
        setLoading(true);
        try {
            const response = await fetchDescriptionReasons(resonCategory);
            setDescriptionReason(response);
        } catch (error) {
            console.error('Error: Load Descriptions Category', error);
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };
    const handleChangeDescription = (event: SelectChangeEvent<string>) => {
        setSelectedDescription(event.target.value);
        const itemSeleted = descriptionReason.find(
            (item) => item.id === Number(event.target.value)
        );
        if (itemSeleted?.notesRequeried) {
            setLegent(true);
        } else {
            setLegent(false);
        }
    };

    return (
        <>
            <TableCell>
                1{/* <VendorBackOrderFile /> */}
                <button onClick={fetchVendors}>Start</button>
                <Select
                    label=''
                    fullWidth
                    size='small'
                    value={selectedVendor}
                    labelId='vendor-selected-label'
                    onChange={handleChangeVendor}
                >
                    {loading ? (
                        <MenuItem disabled>
                            <CircularProgress size={24} />
                        </MenuItem>
                    ) : (
                        vendor.map((v, i) => (
                            <MenuItem
                                key={v.id}
                                value={v.name}
                            >
                                {i + 1} - {v.name}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </TableCell>

            <TableCell>
                <Select
                    label=''
                    fullWidth
                    size='small'
                    value={selectedReason}
                    labelId='reason-selected-label'
                    onChange={handleChangeReason}
                >
                    {loading ? (
                        <MenuItem disabled>
                            <CircularProgress size={24} />
                        </MenuItem>
                    ) : (
                        reasonCategory.map((r, i) => (
                            <MenuItem
                                key={r.id}
                                value={r.id}
                            >
                                {i + 1} - {r.nameCategory} - {r.codeCategory}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </TableCell>

            <TableCell>
                2
                <Select
                    label=''
                    fullWidth
                    size='small'
                    value={selectedDescription}
                    labelId='description-select-label'
                    onChange={handleChangeDescription}
                >
                    {loading ? (
                        <MenuItem disabled>
                            <CircularProgress size={24} />
                        </MenuItem>
                    ) : (
                        descriptionReason.map((d, i) => (
                            <MenuItem
                                key={d.id}
                                value={d.id}
                            >
                                {i + 1} - {d.nameDescription}
                            </MenuItem>
                        ))
                    )}
                    {}
                </Select>
                {legent ? 'Must Add Note' : 'All is ok!'}
                {/* {row.UnitID ? (
                    <ReasonBackOrderFile
                        key={generateKey()}
                        backOrderFile={row}
                    />
                ) : (
                    ''
                )} */}
            </TableCell>

            <TableCell>
                3
                {legent ? (
                    <NoteUserBackOrderFile
                        key={generateKey()}
                        backOrderFile={''}
                    />
                ) : (
                    ''
                )}
            </TableCell>

            <TableCell>
                4
                {/* {row.UnitID ? (
                    <DateExpected
                        key={generateKey()}
                        backOrderFile={row}
                    />
                ) : (
                    ''
                )} */}
            </TableCell>
            <TableCell>5</TableCell>
        </>
    );
}
