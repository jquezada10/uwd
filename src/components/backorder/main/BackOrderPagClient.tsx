'use client';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const BackOrderPagClient = ({ totalPages }: { totalPages: number }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const page = parseInt(searchParams.get('pag') || '1', 10);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('pag', value.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pagination
            page={page}
            count={totalPages}
            onChange={handlePageChange}
        />
    );
};

export default BackOrderPagClient;
