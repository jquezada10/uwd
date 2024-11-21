import { dbpool } from '@/lib/db-config'
import { BackOrder, Order } from './definitions';

// export async function fetchLatestOrders() {
//   try {

//     const pool = await database.connect();

//     let sentence = `
//       SELECT TOP 25 [OrderNumber]
//       ,[IsHold]
//       ,[PONumber]
//       ,[QuoteNumber]
//       ,[OrderedDate]
//       ,[AcknowledgedDate]
//       ,[RequiredDate]
//       ,[ParentDealerNumber]
//       ,[ParentDealerName]
//       ,[DealerNumber]
//       ,[DealerName]
//       ,[SalespersonUserId]
//       ,[Cost]
//       FROM [UnitedDashboard].[dbo].[V_DealerOrders]`;

//     const requestData = await pool.request().query(sentence);

//     const ordernes: Order[] = requestData.recordset.map((row : any)=>(
//       {
//         OrderNumber: row.OrderNumber,
//         IsHold: row.IsHold,
//         PONumber: row.PONumber,
//         QuoteNumber: row.QuoteNumber,
//         OrderedDate: row.OrderedDate,
//         AcknowledgedDate: row.AcknowledgedDate,
//         RequiredDate: row.requestData,
//         ParentDealerNumber: row.ParentDealerNumber,
//         ParentDealerName: row.ParentDealerName,
//         DealerNumber:  row.DealerNumber,
//         DealerName: row.DealerName,
//         SalespersonUserId: row.SalespersonUserId,
//         Cost: row.Cost
//       } as Order
//     ));

//     return {ordernes};

//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest orders.');
//   }
// }


export default async function getBackOrders(){
  const connectpool = await dbpool.connect();

  const sqlSentence = `
  SELECT TOP 5 * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
  ORDER BY OrderNumber , SchedID , UnitID`;
  
  const res = await connectpool.request().query(sqlSentence);
  const raw:BackOrder[] = res.recordset;
  connectpool.close();
  return raw;
}