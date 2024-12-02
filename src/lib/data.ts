import sql from 'mssql';
import { dbpool } from '@/lib/db-config'
import { BackOrder } from './definitions';

const ITEMS_PER_PAGE = 15;
export default async function getBackOrders(order: string, customer: string, location: string, currentPage: number, schdle:string) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pool = await dbpool.connect();

    let sqlSentence = `
      SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CUSTOMER], [LocationID]
      FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
      WHERE 1=1
    `;
    
    // let sqlSentence = `
    //   SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CUSTOMER], [LocationID]
    //   FROM [uwd-test].[dbo].[backorders]
    //   WHERE 1=1
    // `;

    const request = pool.request();

    if (order) {
      sqlSentence += ` AND [OrderNumber] LIKE @order`;
      request.input("order", sql.VarChar, `%${order}%`);
    }

    if (customer) {
      sqlSentence += ` AND [CUSTOMER] LIKE @customer`;
      request.input("customer", sql.VarChar, `%${customer}%`);
    }

    if (location != 'ALL') {
      sqlSentence += ` AND [LocationID] = @location`;
      request.input("location", sql.VarChar, `${location}`);
    }

    if (schdle == 'true') {
      sqlSentence += ` AND [SchedID] is NULL`;
    }

    sqlSentence += `
      ORDER BY TargetShipDate DESC
      OFFSET @offset ROWS
      FETCH NEXT @limit ROWS ONLY
    `;
    
    request.input("limit", sql.Int, ITEMS_PER_PAGE);
    request.input("offset", sql.Int, offset);
    
    const res = await request.query(sqlSentence);
  
    const raw: BackOrder[] = res.recordset;
  
    pool.close();

    return raw;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
  // const sqlSentence = `
  // SELECT * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
  // WHERE CUSTOMER LIKE '${`%${query}%`}'
  // ORDER BY OrderNumber , SchedID , UnitID
  // `;
}

export async function fetchBackOrdersPages(order: string, customer: string, location: string, currentPage: number) {
  try {
    const pool = await dbpool.connect();

    // let sqlSentence = `
    //   SELECT COUNT(*) AS totalBackOrders
    //   FROM [uwd-test].[dbo].[backorders]
    //   WHERE 1=1
    // `;    
    
    let sqlSentence = `
      SELECT COUNT(*) AS totalBackOrders
      FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
      WHERE 1=1
    `;

    const request = pool.request();

    if (order) {
      sqlSentence += ` AND [OrderNumber] LIKE @order`;
      request.input("order", sql.VarChar, `%${order}%`);
    }

    if (customer) {
      sqlSentence += ` AND [CUSTOMER] LIKE @customer`;
      request.input("customer", sql.VarChar, `%${customer}%`);
    }

    if (location != 'ALL') {
      sqlSentence += ` AND [LocationID] = @location`;
      request.input("location", sql.VarChar, `${location}`);
    }
    
    const res = await request.query(sqlSentence);
  
    const totalBackOrders:number = res.recordset[0]?.totalBackOrders || 0;
    const totalPages = Math.ceil(Number(totalBackOrders) / ITEMS_PER_PAGE);
   
    pool.close();

    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
  // const sqlSentence = `
  // SELECT * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
  // WHERE CUSTOMER LIKE '${`%${query}%`}'
  // ORDER BY OrderNumber , SchedID , UnitID
  // `;
}