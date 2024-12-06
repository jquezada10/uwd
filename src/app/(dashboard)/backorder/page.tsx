import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { fetchBackOrdersPages } from '@/lib/data';
import FormFilterBackOrder from '@/components/backorder/FormFilterBackOrder';
import TableDataBackOrder from '@/components/backorder/TableDataBackOrder';
import Pagination from '@/components/backorder/ui/pagination';
import Chip from '@mui/material/Chip';
import TableNormal from '@/components/backorder/ui/tableMui';

export default async function BackOrderPage(props: { searchParams?: Promise<{ orderNumber?: string; customerTitle?: string; locationOrd?: string, page?: string; schdle?: string }>; }) {

  const searchParams = await props.searchParams;
  const order = searchParams?.orderNumber || '';
  const customer = searchParams?.customerTitle || '';
  const location = searchParams?.locationOrd || 'ALL';
  const schdle = searchParams?.schdle || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchBackOrdersPages(order, customer, location, currentPage);

  const backorder: string = '12345-1414-125' 
  return (
    <Grid size={{ xs: 12, md: 12 }}>
      {/* Filter BackOrder */}
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent style={{padding: 16}}>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Filter BarckOrders
          </Typography>

          <Stack
            spacing={1}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            direction={{
              xs: 'column',
              sm: 'row'
            }}
          >
            <FormFilterBackOrder />
          </Stack>
        </CardContent>
      </Card>
      <br />
      {/* BackOrders List */}
      <Card variant="outlined" sx={{ width: '100%', p: 0 }}>
        <CardContent style={{padding: 0}}>
          
          {/* Table BackOrder */}
          <TableDataBackOrder order={order} customer={customer} location={location} schdle={schdle} currentPage={currentPage} />
          
          {/* Pagination Backorder */}
          {/* <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Grid sx={{ order: { xs: 2, sm: 1 } }}>
              <Pagination totalPages={totalPages} />
            </Grid>
            <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
              <Stack spacing={0} sx={{ mx: 2 }} flexDirection={{ xs: 'row', sm: 'column' }}>
                <span><Chip size="small" label='M : M A I N' color='success' /></span>
                <span><Chip size="small" label='W : WAYNE' color='error' /></span>
              </Stack>
            </Grid>
          </Grid> */}
        </CardContent>
      </Card>
    </Grid>
  );
}
      
{/* <br />

<br/>
<NoteUser backorder={backorder}/>
<br />
<DateExpected backorder={backorder}/> */}