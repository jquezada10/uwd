import { fetchBackOrdersView } from "@/lib/data";


export  default async function Loading() {
    const backorders: [] = await fetchBackOrdersView();
    return (
        <div>
            Data
        </div>
    );
}