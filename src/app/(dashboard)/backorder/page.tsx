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

export default async function BackOrderPage(props: { searchParams?: Promise<{ orderNumber?: string; customerTitle?: string; locationOrd?: string, page?: string; schdle?: string }>; }) {

  const searchParams = await props.searchParams;
  const order = searchParams?.orderNumber || '';
  const customer = searchParams?.customerTitle || '';
  const location = searchParams?.locationOrd || 'ALL';
  const schdle = searchParams?.schdle || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchBackOrdersPages(order, customer, location, currentPage);

  return (
    <Grid size={{ xs: 12, md: 12 }}>
      <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Filter BarckOrders
          </Typography>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row" sx={{ alignContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center', gap: 1, }}>
              <FormFilterBackOrder />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ width: '100%', p: 0 }}>
        <CardContent>
          <TableDataBackOrder order={order} customer={customer} location={location} schdle={schdle} currentPage={currentPage} />
          <div className="">

          </div>

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Grid sx={{ order: { xs: 2, sm: 1 } }}>
              <Pagination totalPages={totalPages} />
            </Grid>
            <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
              <Stack spacing={0} sx={{mx:2}} flexDirection={{ xs: 'row', sm: 'column' }}>
              <span><Chip size="small" label='M : M A I N' color='success' /></span>
              <span><Chip size="small" label='W : WAYNE' color='error' /></span>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}