'use server';
import sql from 'mssql';
import { getDbConnection } from '@/lib/db-config';
import { prisma } from '@/lib/prisma';
import { ConnectionPool } from 'mssql';
import {
    BackOrder,
    FilterParams,
    OrderUnitFile,
    SearchParams,
} from '@/lib/definitions';

const ITEMS_PER_PAGE = 15;

export async function fetchBackOrdersView(filters: FilterParams) {
    console.log('filtros - fetchBackOrdersView', filters);
    const offset: number = (filters.pag - 1) * ITEMS_PER_PAGE;

    try {
        const pool: ConnectionPool = await getDbConnection();

        let querySQL: string = `
        SELECT [V_BACKORDER].[SchedID]
        ,[V_BACKORDER].[UnitID]
        ,[V_BACKORDER].[OrderNumber]
        ,[V_BACKORDER].[PONumber]
        ,[V_BACKORDER].[LineItem]
        ,[V_BACKORDER].[TargetShipDate]
        ,[V_BACKORDER].[Route]
        ,[V_BACKORDER].[LocationID]
        ,[V_BACKORDER].[CustomerID]
        ,[V_BACKORDER].[CUSTOMER]
        ,[BackorderFile].*
        FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
        LEFT JOIN [UWD-SQL2016].UnitedDashboard.dbo.BackorderFile
        ON V_BACKORDER.SchedID = BackorderFile.scheduleId AND V_BACKORDER.UnitID = BackorderFile.unitId
        WHERE 1=1`;

        const request = pool.request();

        if (filters.ord) {
            querySQL += ` AND [OrderNumber] LIKE @order`;
            request.input('order', sql.VarChar, `%${filters.ord}%`);
        }

        if (filters.pon) {
            querySQL += ` AND [PONumber] LIKE @porder`;
            request.input('porder', sql.VarChar, `%${filters.pon}%`);
        }

        if (filters.cus) {
            querySQL += ` AND [CUSTOMER] LIKE @customer`;
            request.input('customer', sql.VarChar, `%${filters.cus}%`);
        }

        if (filters.loc) {
            querySQL += ` AND [LocationID] = @location`;
            request.input('location', sql.VarChar, `${filters.loc}`);
        }

        if (filters.sch) {
            querySQL += ` AND [V_BACKORDER].[SchedID] IS NULL`;
        }

        querySQL += `
          ORDER BY TargetShipDate DESC
          OFFSET @offset ROWS
          FETCH NEXT @limit ROWS ONLY
        `;
        request.input('limit', sql.Int, ITEMS_PER_PAGE);
        request.input('offset', sql.Int, offset);

        const res = await request.query(querySQL);
        const raw: BackOrder[] = res.recordset;
        return raw;
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchBackOrdersPagesView(filters: FilterParams) {
    console.log('filtros - Calculando COUNT VIEW', filters);
    const offset: number = (filters.pag - 1) * ITEMS_PER_PAGE;

    try {
        const pool: ConnectionPool = await getDbConnection();

        let querySQL: string = `
        SELECT COUNT(*) AS totalBackOrders
        FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
        LEFT JOIN [UWD-SQL2016].UnitedDashboard.dbo.BackorderFile
        ON V_BACKORDER.SchedID = BackorderFile.scheduleId AND V_BACKORDER.UnitID = BackorderFile.unitId
        WHERE 1=1`;

        const request = pool.request();

        if (filters.ord) {
            querySQL += ` AND [OrderNumber] LIKE @order`;
            request.input('order', sql.VarChar, `%${filters.ord}%`);
        }

        if (filters.pon) {
            querySQL += ` AND [PONumber] LIKE @porder`;
            request.input('porder', sql.VarChar, `%${filters.pon}%`);
        }

        if (filters.cus) {
            querySQL += ` AND [CUSTOMER] LIKE @customer`;
            request.input('customer', sql.VarChar, `%${filters.cus}%`);
        }

        if (filters.loc) {
            querySQL += ` AND [LocationID] = @location`;
            request.input('location', sql.VarChar, `${filters.loc}`);
        }

        if (filters.sch) {
            querySQL += ` AND [V_BACKORDER].[SchedID] IS NULL`;
        }

        const res = await request.query(querySQL);
        const totalBackOrders: number = res.recordset[0]?.totalBackOrders || 0;
        const totalBackOrdersPages = Math.ceil(
            Number(totalBackOrders) / ITEMS_PER_PAGE
        );

        return totalBackOrdersPages;
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchPrismaBackOrderFile(codeBackOrderFile: string) {
    const backOrderFile = await prisma.backorderFile.findUnique({
        where: { codeBckOrd: codeBackOrderFile },
    });

    if (!backOrderFile) {
        return {
            codeBckOrd: codeBackOrderFile,
            scheduleId: null,
            unitId: null,
            orderId: null,
            reasonId: null,
            noteUser: '',
            expectedDate: null,
            newDateClient: null,
        };
    }

    return backOrderFile;
}

export async function setNoteUserBackOrderFile(
    codeBackOrder: string,
    scheduleId: number,
    unitId: number,
    orderId: number,
    newNoteUser: string
) {
    await prisma.backorderFile.upsert({
        where: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId),
        },
        update: {
            noteUser: newNoteUser,
        },
        create: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId),
            reasonId: 1,
            noteUser: newNoteUser,
        },
    });
}

export async function setReasonBackOrderFile(
    codeBackOrder: string,
    scheduleId: number,
    unitId: number,
    orderId: number,
    newReason: number
) {
    await prisma.backorderFile.upsert({
        where: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId),
        },
        update: {
            reasonId: newReason,
        },
        create: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId),
            reasonId: newReason,
        },
    });
}

export async function setExpDateBackOrderFile(
    codeBackOrder: string,
    scheduleId: number,
    unitId: number,
    orderId: number,
    expectedDate: Date,
    customerId: string
) {
    // const dateWith7Days = new Date(expectedDate);
    // dateWith7Days.setDate(expectedDate.getDate() + 7);
    // console.log(dateWith7Days)

    const date1: string = expectedDate.toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });
    try {
        const pool: ConnectionPool = await getDbConnection();

        let querySQL: string = `EXEC UnitedDashboard.[dbo].[prc_Backorder_ExpectedDate] '${customerId}',  '${date1}'`;

        const request = pool.request();
        request.input('limit', sql.Int, ITEMS_PER_PAGE);
        const res = await request.query(querySQL);
        const date2: Date = res.recordset[0].Expected_Date;

        console.log(date2);

        await prisma.backorderFile.upsert({
            where: {
                codeBckOrd: codeBackOrder,
                scheduleId: Number(scheduleId),
                unitId: Number(unitId),
                orderId: Number(orderId),
            },
            update: {
                expectedDate: expectedDate,
                newDateClient: date2,
            },
            create: {
                codeBckOrd: codeBackOrder,
                scheduleId: Number(scheduleId),
                unitId: Number(unitId),
                orderId: Number(orderId),
                expectedDate: expectedDate,
                newDateClient: date2,
            },
        });

        return date2.toLocaleDateString('en-US', { timeZone: 'UTC' });
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fecthBackOrderFiles(reasons: Array<Number>) {
    // console.log('reasons', reasons)
    const filters: any = {};

    if (reasons) {
        filters.reasonId = {
            in: reasons,
        };
    }

    const filesWithReason = await prisma.backorderFile.findMany({
        where: filters,
        select: { orderId: true, unitId: true, codeBckOrd: true },
    });

    // console.log('ordenes pro reasons', ordenes);
    // const filesWithReason = ordenes.map((i) => (i.orderId))
    // console.log(filesWithReason)
    return filesWithReason;
}

export async function fecthBackOrderFilesAll(reasons: Array<Number>) {
    // console.log('reasons', reasons)
    // const filters: any = {};

    // if (reasons) {
    //     filters.reasonId = {
    //         in: reasons,
    //     };
    // }
    // console.log('------>', reasons);

    const filesWithReason = await prisma.backorderFile.findMany();

    // console.log('ordenes pro reasons', ordenes);
    // const filesWithReason = ordenes.map((i) => (i.orderId))
    // console.log(filesWithReason)
    return filesWithReason;
}

// export async function fetchDBBackOrders(order: string, customer: string, location: string, currentPage: number, schdle:string) {
//     const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//
//     try {
//         const pool = await dbpool.connect();
//
//         // language=SQL format=false
//         let sqlSentence = `SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CUSTOMER], [LocationID] FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER WHERE 1=1`;
//
//         // let sqlSentence = `
//         //   SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CUSTOMER], [LocationID]
//         //   FROM [uwd-test].[dbo].[backorders]
//         //   WHERE 1=1
//         // `;
//
//         const request = pool.request();
//
//         if (order) {
//             sqlSentence += ` AND [OrderNumber] LIKE @order`;
//             request.input("order", sql.VarChar, `%${order}%`);
//         }
//
//         if (customer) {
//             sqlSentence += ` AND [CUSTOMER] LIKE @customer`;
//             request.input("customer", sql.VarChar, `%${customer}%`);
//         }
//
//         if (location != 'ALL') {
//             sqlSentence += ` AND [LocationID] = @location`;
//             request.input("location", sql.VarChar, `${location}`);
//         }
//
//         if (schdle == 'true') {
//             sqlSentence += ` AND [SchedID] is NULL`;
//         }
//
//         sqlSentence += `
//       ORDER BY TargetShipDate DESC
//       OFFSET @offset ROWS
//       FETCH NEXT @limit ROWS ONLY
//     `;
//
//         request.input("limit", sql.Int, ITEMS_PER_PAGE);
//         request.input("offset", sql.Int, offset);
//
//         const res = await request.query(sqlSentence);
//
//         const raw: BackOrder[] = res.recordset;
//
//         pool.close();
//
//         return raw;
//
//     } catch (error) {
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch invoices.');
//     }
//     // const sqlSentence = `
//     // SELECT * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
//     // WHERE CUSTOMER LIKE '${`%${query}%`}'
//     // ORDER BY OrderNumber , SchedID , UnitID
//     // `;
// }
//
// export async function fetchBackOrdersPages(order: string, customer: string, location: string, currentPage: number) {
//     try {
//         const pool = await dbpool.connect();
//
//         // let sqlSentence = `
//         //   SELECT COUNT(*) AS totalBackOrders
//         //   FROM [uwd-test].[dbo].[backorders]
//         //   WHERE 1=1
//         // `;
//
//         let sqlSentence = `
//             SELECT COUNT(*) AS totalBackOrders
//             FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
//             WHERE 1=1
//         `;
//
//         const request = pool.request();
//
//         if (order) {
//             sqlSentence += ` AND [OrderNumber] LIKE @order`;
//             request.input("order", sql.VarChar, `%${order}%`);
//         }
//
//         if (customer) {
//             sqlSentence += ` AND [CUSTOMER] LIKE @customer`;
//             request.input("customer", sql.VarChar, `%${customer}%`);
//         }
//
//         if (location != 'ALL') {
//             sqlSentence += ` AND [LocationID] = @location`;
//             request.input("location", sql.VarChar, `${location}`);
//         }
//
//         const res = await request.query(sqlSentence);
//
//         const totalBackOrders:number = res.recordset[0]?.totalBackOrders || 0;
//         const totalPages = Math.ceil(Number(totalBackOrders) / ITEMS_PER_PAGE);
//
//         pool.close();
//
//         return totalPages;
//
//     } catch (error) {
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch invoices.');
//     }
//     // const sqlSentence = `
//     // SELECT * FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
//     // WHERE CUSTOMER LIKE '${`%${query}%`}'
//     // ORDER BY OrderNumber , SchedID , UnitID
//     // `;
// }
