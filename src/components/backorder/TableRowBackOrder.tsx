import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack';
import FormBackOrder from './FormBackOrder'
import getBackOrders from "@/lib/data"
import { BackOrder } from '@/lib/definitions';
import CheckBackorder from '@/components/backorder/CheckBackOrder';
import ReasonComplete from './ReasonComplete';
import NoteUserBackOrderFile from '@/components/backorder/NoteUserBackOrderFile';
import DateExpected from '@/components/backorder/DateExpected';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';





export default async function TableRowBackOrder({
  order,
  customer,
  location,
  schdle,
  currentPage,
}: {
  order: string;
  customer: string;
  location: string;
  schdle: string;
  currentPage: number;
}) {

  console.log('1 se va a extraer')
  let data: BackOrder[] = await getBackOrders(order, customer, location, currentPage, schdle);
  console.log(data)
  console.log('2 se obtuvieron los backords ^^');
  console.log('3 se va  mutar data-sql  ')

  data.map(async (bko) => {
    const codeBckOrd: string = bko.SchedID + '-' + bko.UnitID + '-' + bko.OrderNumber;
    const params = new URLSearchParams({ codeBckOrd: codeBckOrd });
    const response = await fetch(`http://127.0.0.1:3000/api/backorderfile?${params.toString()}`);
    const data = await response.json();
    bko["backOrderFile"] = data;
  })

  const c: number = 1;
  return (
    <>
      {data.map((item, i) => {  
        // console.log('la nueva data',data)
        // try {
        //   // Hacer la consulta fetch para cada registro
        //   const codeBckOrd: string = item.SchedID + '-' + item.UnitID + '-' + item.OrderNumber;
        //   const params = new URLSearchParams({ codeBckOrd: codeBckOrd });
        //   const response = await fetch(`http://127.0.0.1:3000/api/backorderfile?${params.toString()}`);

        //   // Verificar si la respuesta es correcta
        //   if (!response.ok) {
        //     console.error(`Error al obtener datos`);
        //   }

        //   // Obtener los datos en formato JSON
        //   const data = await response.json();


        //   // Mostrar los resultados en consola
        //   return(
        //     <TableRow>
        //       <TableCell>1</TableCell>
        //       <TableCell>{i + c}</TableCell>
        //       <TableCell>{data.closed}</TableCell>
        //       <TableCell>4</TableCell>
        //       <TableCell>5</TableCell>
        //       <TableCell>6</TableCell>
        //       <TableCell>{data.codeBckOrd}</TableCell>
        //       <TableCell>{data.noteUser}<NoteUserBackOrderFile backorder={codeBckOrd} /></TableCell>
        //       <TableCell>9</TableCell>
        //       <TableCell>10</TableCell>
        //     </TableRow>
        //   )

        // } catch (error) {
        //   console.error(`Error al hacer fetch`, error);
        // }
        return (
          <TableRow key={i}>
            <TableCell sx={{ p: 0, m: 0 }}>
              {/* <CheckBackorder /> */}
            </TableCell>

            <TableCell>Ø
              {i + c}
            </TableCell>

            <TableCell>
              {/* <a href={`http://uwd-fvsql/BI/reportviewer.aspx?report=331&order=${item.OrderNumber}`} target='_blank'>{item.OrderNumber}</a> */}
              {item.OrderNumber}
            </TableCell>

            <TableCell align='center'>
              {item.LineItem}
            </TableCell>

            <TableCell align='center'>
              {!item.UnitID ? <Chip label="Unscheduled" /> : item.UnitID}
            </TableCell>

            <TableCell>

            </TableCell>

            <TableCell>
              {/* {item.backOrderFile} */}
              {/* {!item.UnitID ? '' : <Stack minWidth={320}><ReasonComplete /></Stack>} */}
            </TableCell>

            <TableCell>
              {/*{item.newField}*/}
              {/* {!item.UnitID ? '' : <Stack minWidth={300}></Stack>} */}
            </TableCell>

            <TableCell>
              {/* {!item.UnitID ? '' : <Stack minWidth={70}><DateExpected backorder={codeBckOrd}  /></Stack>} */}
            </TableCell>

            <TableCell>
              {/* {!item.UnitID ? '' : <Stack minWidth={70}><span> </span></Stack>} */}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  );
}