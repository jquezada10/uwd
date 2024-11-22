'use server'
import TableDataBackOrder from '@/components/backorder/TableDataBackOrder';
import FormFilterBackOrder from '@/components/backorder/FormFilterBackOrder';
import { BackOrder } from '@/lib/definitions';
import getBackOrders from "@/lib/data"

export default async function BackOrdersMain() {
  const data: BackOrder[] = await getBackOrders();
  return (
    <div>
      <FormFilterBackOrder />
      <br />
      <hr />
      <TableDataBackOrder data={data}/>
    </div>
  );
}