'use server';
import * as React from 'react';
import { Suspense } from 'react';

import { FilterParams } from '@/lib/definitions';
import FormFilterBackOrder from '@/components/backorder/filter/FormFilterBackOrder';
import BackOrderTable from '@/components/backorder/main/BackOrderTable';
import BackOrderPagination from '@/components/backorder/main/BackOrderPagination';

export default async function BackOrderPage(props: {
    searchParams?: Promise<FilterParams>;
}) {
    const fParams = await props.searchParams;
    const filters: FilterParams = {
        ord: fParams?.ord || '',
        pon: fParams?.ord || '',
        cus: fParams?.cus || '',
        loc: fParams?.loc || '',
        sch: fParams?.sch || '',
        pag: fParams?.pag || 1,
    };

    return (
        <div>
            <FormFilterBackOrder />
            <BackOrderTable filters={filters} />
            <Suspense fallback={<p>LOADING PAGINATION.............</p>}>
                <BackOrderPagination filters={filters} />
            </Suspense>
        </div>
    );
}
