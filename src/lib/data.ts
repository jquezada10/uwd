import { dbpool } from '@/lib/db-config'
import { BackOrder } from './definitions';

export default async function getBackOrders(query: string, currentPage: number){
  console.log('Mrs, quieren los siguientes filtros:', query, currentPage)
  const connectpool = await dbpool.connect();

  const sqlSentence = `
  SELECT TOP 50 * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
  WHERE CUSTOMER LIKE '${`%${query}%`}'
  ORDER BY OrderNumber , SchedID , UnitID
  `;
  
  const res = await connectpool.request().query(sqlSentence);
  const raw:BackOrder[] = res.recordset;
  console.log(raw);
  connectpool.close();
  return raw;
}