'use server';
import sql from "mssql";
import { getDbConnection } from '@/lib/db-config'
import { prisma } from "@/lib/prisma";
import { ConnectionPool } from "mssql";
import { BackOrder, OrderUnitFile, SearchParams } from "@/lib/definitions";


const ITEMS_PER_PAGE = 15;


export async function fetchDBBackOrders(paramsFilter: SearchParams) {

    const offset: number = (paramsFilter.pag - 1) * ITEMS_PER_PAGE;


    try {
        const pool: ConnectionPool = await getDbConnection();

        // TODO: Change querySQL bellow in BD United
        let querySQL: string = `SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CUSTOMER], [LocationID] FROM [uwd-test].[dbo].[backorders] WHERE 1=1`;
        // let querySQL : string = `SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CUSTOMER], [LocationID] FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER WHERE 1=1`;

        const request = pool.request();

        if (paramsFilter.files) {
            const fParams : any = paramsFilter.files;
            const orderIds = fParams.map((item:OrderUnitFile) => item.orderId);
            const unitIds = fParams.map((item:OrderUnitFile) => item.unitId);
            
            // console.log(orderIds, unitIds);
            // const files = paramsFilter.files.join(',')
            // console.log('tenemos parametros y son estos', paramsFilter.files)
            querySQL += ` AND [OrderNumber] IN (${orderIds}) AND [UnitID] IN (${unitIds})`;
        }

        if (paramsFilter.ord) {
            querySQL += ` AND [OrderNumber] LIKE @order`;
            request.input("order", sql.VarChar, `%${paramsFilter.ord}%`);
        }

        if (paramsFilter.cus) {
            querySQL += ` AND [CUSTOMER] LIKE @customer`;
            request.input("customer", sql.VarChar, `%${paramsFilter.cus}%`);
        }

        if (paramsFilter.loc != 'ALL') {
            querySQL += ` AND [LocationID] = @location`;
            request.input("location", sql.VarChar, `${paramsFilter.loc}`);
        }

        // TODO: Change 'NULL' to NULL in BD United
        if (paramsFilter.sch == 'true') {
            querySQL += ` AND [SchedID] = 'NULL'`;
        }

        querySQL += `
          ORDER BY TargetShipDate DESC
          OFFSET @offset ROWS
          FETCH NEXT @limit ROWS ONLY
        `;
        request.input("limit", sql.Int, ITEMS_PER_PAGE);
        request.input("offset", sql.Int, offset);

        const res = await request.query(querySQL);

        const raw: BackOrder[] = res.recordset;

        return raw

    } catch (error) {
        console.error("Error ejecutando la consulta:", error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchBackOrdersPages(paramsFilter: SearchParams) {
    try {
        const pool: ConnectionPool = await getDbConnection();

        let querySQL = `
          SELECT COUNT(*) AS totalBackOrders
          FROM [uwd-test].[dbo].[backorders]
          WHERE 1=1
        `;

        // let sqlSentence = `
        //     SELECT COUNT(*) AS totalBackOrders
        //     FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
        //     WHERE 1=1
        // `;

        const request = pool.request();

        if (paramsFilter.files) {
            const fParams : any = paramsFilter.files;
            const orderIds = fParams.map((item:OrderUnitFile) => item.orderId);
            const unitIds = fParams.map((item:OrderUnitFile) => item.unitId);
            
            // console.log(orderIds, unitIds);
            // const files = paramsFilter.files.join(',')
            // console.log('tenemos parametros y son estos', paramsFilter.files)
            querySQL += ` AND [OrderNumber] IN (${orderIds}) AND [UnitID] IN (${unitIds})`;
        }

        if (paramsFilter.ord) {
            querySQL += ` AND [OrderNumber] LIKE @order`;
            request.input("order", sql.VarChar, `%${paramsFilter.ord}%`);
        }

        if (paramsFilter.cus) {
            querySQL += ` AND [CUSTOMER] LIKE @customer`;
            request.input("customer", sql.VarChar, `%${paramsFilter.cus}%`);
        }

        if (paramsFilter.loc != 'ALL') {
            querySQL += ` AND [LocationID] = @location`;
            request.input("location", sql.VarChar, `${paramsFilter.loc}`);
        }

        // TODO: Change 'NULL' to NULL in BD United
        if (paramsFilter.sch == 'true') {
            querySQL += ` AND [SchedID] = 'NULL'`;
        }

        const res = await request.query(querySQL);

        const totalBackOrders:number = res.recordset[0]?.totalBackOrders || 0;
        const totalPages = Math.ceil(Number(totalBackOrders) / ITEMS_PER_PAGE);

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


export async function fetchPrismaBackOrderFile(codeBackOrderFile: string) {
    const backOrderFile = await prisma.backorderFile.findUnique({
        where: { codeBckOrd: codeBackOrderFile }
    })

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
    newNoteUser: string,
) {
    await prisma.backorderFile.upsert({
        where: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId)
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
    })
}

export async function setReasonBackOrderFile(
    codeBackOrder: string,
    scheduleId: number,
    unitId: number,
    orderId: number,
    newReason: number,
) {
    await prisma.backorderFile.upsert({
        where: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId)
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
    })
}


export async function setExpDateBackOrderFile(
    codeBackOrder: string,
    scheduleId: number,
    unitId: number,
    orderId: number,
    expectedDate: Date,
) {

    const dateWith7Days = new Date(expectedDate);
    dateWith7Days.setDate(expectedDate.getDate() + 7);
    // console.log(dateWith7Days)

    await prisma.backorderFile.upsert({
        where: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId)
        },
        update: {
            expectedDate: expectedDate,
            newDateClient: dateWith7Days
        },
        create: {
            codeBckOrd: codeBackOrder,
            scheduleId: Number(scheduleId),
            unitId: Number(unitId),
            orderId: Number(orderId),
            expectedDate: expectedDate,
            newDateClient: dateWith7Days
        },
    })
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
        where: filters, select: { orderId: true, unitId: true }
    });

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