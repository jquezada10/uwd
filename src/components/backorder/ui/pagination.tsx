'use client';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('pag')) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('pag', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      {/* <PaginationControlled count={totalPages}/> */}
      <Stack direction="row" sx={{ my: 2, mx:2}}>
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <Box
          sx={{
            mx:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            {allPages.map((page, index) => {
              let position: 'first' | 'last' | 'single' | 'middle' | undefined;

              if (index === 0) position = 'first';
              if (index === allPages.length - 1) position = 'last';
              if (allPages.length === 1) position = 'single';
              if (page === '...') position = 'middle';

              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}
          </ButtonGroup>
        </Box>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </Stack>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  return isActive ? (
    <Button variant="contained">{page}</Button>
  ) : (
    <Link href={href}>
      <Button variant="outlined">{page}</Button>
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <KeyboardArrowLeftIcon className="w-4" />
    ) : (
      <KeyboardArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div>
      <Button variant="outlined" disabled size="medium">{icon}</Button>
    </div>
  ) : (
    <Link className={className} href={href}>
      <Button variant="outlined" size="medium">{icon}</Button>
    </Link>
  );
}
