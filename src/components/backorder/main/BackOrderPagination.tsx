import { FilterParams } from '@/lib/definitions';
import BackOrderPagClient from './BackOrderPagClient';
import { fetchBackOrdersPagesView } from '@/lib/data';

export default async function BackOrderPagination({
    filters,
}: {
    filters: FilterParams;
}) {
    const totalPages: number = await fetchBackOrdersPagesView(filters);
    console.log('total de paginas devuelvtas', totalPages);
    return <BackOrderPagClient totalPages={totalPages} />;
}
