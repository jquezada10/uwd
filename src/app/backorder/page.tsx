'use server'
import Table from "./table"
import {fetchLatestOrders} from '@/lib/data'

export default async function Page() { 
  const lastOrders = await fetchLatestOrders();
  <Table utlimasOrders={lastOrders} />
  return <h1>BKO</h1>
}