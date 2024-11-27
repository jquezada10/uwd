import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormFilterBackOrder from '@/components/backorder/FormFilterBackOrder';
import TableDataBackOrder from '@/components/backorder/TableDataBackOrder';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  console.log(query, currentPage);
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, pb: 5, mt: { xs: 8, md: 0 }, }}>
      <FormFilterBackOrder />
      <TableDataBackOrder query={query} currentPage={currentPage}/>
    </Stack>
  );
}