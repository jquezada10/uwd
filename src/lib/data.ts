import { dbpool } from '@/lib/db-config'
import { BackOrder, Order } from './definitions';

export default async function getBackOrders(){
  const connectpool = await dbpool.connect();

  const sqlSentence = `
  SELECT * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
  ORDER BY OrderNumber , SchedID , UnitID`;
  
  const res = await connectpool.request().query(sqlSentence);
  const raw:BackOrder[] = res.recordset;
  connectpool.close();
  return raw;
}