import {database} from '@/lib/db'
import { Order } from './definitions';

export async function fetchLatestOrders() {
  try {

    const pool = await database.connect();

    let sentence = `
      SELECT TOP 10 [OrderNumber]
      ,[IsHold]
      ,[PONumber]
      ,[QuoteNumber]
      ,[OrderedDate]
      ,[AcknowledgedDate]
      ,[RequiredDate]
      ,[ParentDealerNumber]
      ,[ParentDealerName]
      ,[DealerNumber]
      ,[DealerName]
      ,[SalespersonUserId]
      ,[Cost]
  FROM [UnitedDashboard].[dbo].[V_DealerOrders]`;

    const requestData = await pool.request().query(sentence);

    const ordernes: Order[] = requestData.recordset.map((row : any)=>(
      {
        OrderNumber: row.OrderNumber,
        IsHold: row.IsHold,
        PONumber: row.PONumber,
        QuoteNumber: row.QuoteNumber,
        OrderedDate: row.OrderedDate,
        AcknowledgedDate: row.AcknowledgedDate,
        RequiredDate: row.requestData,
        ParentDealerNumber: row.ParentDealerNumber,
        ParentDealerName: row.ParentDealerName,
        DealerNumber:  row.DealerNumber,
        DealerName: row.DealerName,
        SalespersonUserId: row.SalespersonUserId,
        Cost: row.Cost
      } as Order
    ));

    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa', ordernes)
    return {ordernes};

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest orders.');
  }
}