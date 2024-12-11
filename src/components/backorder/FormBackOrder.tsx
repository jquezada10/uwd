import NoteUserBackOrderFile from '@/components/backorder/main/NoteUserBackOrderFile';
import DateExpected from '@/components/backorder/main/DateExpectedBackOrderFile';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ReasonComplete from '@/components/backorder/ReasonComplete'

export default function Page() {
  return (
    <Box sx={{ flexDirection: 'row' }}>
      <form>
        <Stack direction="row" spacing={1}>
          {/* <ReasonComplete /> */}
          {/* <NoteUserBackOrderFile /> */}
          {/* <DateExpected /> */}
          {/* <FormControl sx={{ mx: 1, minWidth: 120 }} size="small">
            <TextField id="newdexpectdate" label="" size="small"
              type="Date" slotProps={{ input: { readOnly: true, disabled: true }, }} />
          </FormControl> */}
        </Stack>
      </form>
    </Box>
  );
}