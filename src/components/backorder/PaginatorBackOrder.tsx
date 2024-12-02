'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';

export default function PaginationControlled({ count }: { count: number }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      {/* <Pagination count={count} page={page} onChange={handleChange} /> */}
      <Pagination
        page={page}
        count={count}
        onChange={handleChange}
        renderItem={(item) => (
          <Link href={`/backorder?page=${item.page}`}>
            <PaginationItem {...item} />
          </Link>
        )}
      />
    </Stack>
  );
}