import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import { fetchBackOrdersView } from '@/lib/data';
import { formtLocalDate, generateKey } from '@/lib/utils';
import { BackOrder, BackOrderGeneral, FilterParams } from '@/lib/definitions';
import ReasonBackOrderFile from '@/components/backorder/main/ReasonBackOrderFile';
import NoteUserBackOrderFile from '@/components/backorder/main/NoteUserBackOrderFile';
import DateExpected from '@/components/backorder/main/DateExpectedBackOrderFile';
import BackOrderFileParent from './BackOrderFileParent';

function ChipLocation({ location }: { location: string }) {
    const locationOrd = location.at(0);
    if (locationOrd == 'M') {
        return (
            <Chip
                size='small'
                label={locationOrd}
                color='success'
            />
        );
    }
    if (locationOrd == 'W') {
        return (
            <Chip
                size='small'
                label={locationOrd}
                color='primary'
            />
        );
    }
}

export default async function BackOrderRow({ filters }: { filters: FilterParams }) {
    console.log('filtros - BackOrderRow:', filters);
    const backorders: BackOrder[] = await fetchBackOrdersView(filters);
    return (
        <TableBody>
            {backorders.map((row: BackOrderGeneral, i: number) => (
                <TableRow key={generateKey()}>
                    <TableCell key={generateKey()}>{i + 1}</TableCell>

                    <TableCell key={generateKey()}>
                        <ChipLocation location={row.LocationID} />
                        <a
                            href={`http://uwd-fvsql/BI/reportviewer.aspx?report=331&order=${row.OrderNumber}`}
                            target='_blank'
                        >
                            {row.OrderNumber}
                        </a>
                        {/* {row.OrderNumber} */}
                    </TableCell>

                    <TableCell key={generateKey()}>{row.PONumber}</TableCell>

                    <TableCell key={generateKey()}>{row.LineItem}</TableCell>

                    <TableCell key={generateKey()}>
                        {row.UnitID ? (
                            row.UnitID
                        ) : (
                            <Chip
                                label='Unscheduled'
                                color='error'
                            />
                        )}
                    </TableCell>

                    <TableCell sx={{ fontWeight: 650 }}>
                        <span>{row.CUSTOMER}</span> <br />
                        <span>
                            Target Ship Date:
                            {formtLocalDate(
                                row.TargetShipDate.toISOString().split('T')[0]
                            )}
                        </span>
                    </TableCell>

                    <TableCell>10</TableCell>

                    <BackOrderFileParent />

                </TableRow>
            ))}
        </TableBody>
    );
}
