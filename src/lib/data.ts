'use server';
import sql from "mssql";
import { getDbConnection } from '@/lib/db-config'
import { prisma } from "@/lib/prisma";
import { ConnectionPool } from "mssql";
import { BackOrder, FilterParams, OrderUnitFile, paramsURL, SearchParams } from "@/lib/definitions";


const ITEMS_PER_PAGE = 15;


export async function fetchDBBackOrders(paramsFilter: SearchParams) {

    const offset: number = (paramsFilter.pag - 1) * ITEMS_PER_PAGE;


    try {
        const pool: ConnectionPool = await getDbConnection();

        // TODO: Change querySQL bellow in BD United
        //let querySQL: string = `SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CustomerID], [CUSTOMER], [LocationID] FROM [uwd-test].[dbo].[backorders] WHERE 1=1`;
        let querySQL : string = `SELECT [SchedID], [UnitID], [OrderNumber], [LineItem], [PartNo], [TargetShipDate], [CustomerID], [CUSTOMER], [LocationID] FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER WHERE 1=1`;

        const request = pool.request();

        if (paramsFilter.files) {
            console.log('------------->', paramsFilter)
            const fParams : any = paramsFilter.files;
            const orderIds = fParams.map((item:OrderUnitFile) => item.orderId);
            const unitIds = fParams.map((item:OrderUnitFile) => item.unitId);
            // const lineNumber = fParams.map((item:OrderUnitFile) => item.codeBckOrd.split('-')[3]);
            if(paramsFilter.reas === 3){
                querySQL += ` AND [OrderNumber] NOT IN (${orderIds}) AND [UnitID] NOT IN (${unitIds})`;
            }else{

                querySQL += ` AND [OrderNumber] IN (${orderIds}) AND [UnitID] IN (${unitIds})`;
            }
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
            querySQL += ` AND [SchedID] IS NULL`;
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

        // let querySQL = `
        //   SELECT COUNT(*) AS totalBackOrders
        //   FROM [uwd-test].[dbo].[backorders]
        //   WHERE 1=1
        // `;

        let querySQL = `
            SELECT COUNT(*) AS totalBackOrders
            FROM [UWD-SQL2016].UnitedDashboard.dbo.V_BACKORDER
            WHERE 1=1
        `;

        const request = pool.request();

        if (paramsFilter.files) {
            const fParams : any = paramsFilter.files;
            const orderIds = fParams.map((item:OrderUnitFile) => item.orderId.toString());
            const unitIds = fParams.map((item:OrderUnitFile) => item.unitId.toString());
            // const lineNumber = fParams.map((item:OrderUnitFile) => item.codeBckOrd.split('-')[3]);

            const aux = orderIds.map((elemento: any) => `'${elemento}'`).join(",")
            // console.log('revisalo------------------>>>',aux )
            // querySQL += ` AND [OrderNumber] IN (${aux}) AND [UnitID] IN (${unitIds})`;
            // querySQL += ` AND [OrderNumber] IN (${aux}) `;
            // console.log(querySQL)

            if(paramsFilter.reas === 3){
                querySQL += ` AND [OrderNumber] NOT IN (${aux}) AND [UnitID] NOT IN (${unitIds})`;
            }else{
                querySQL += ` AND [OrderNumber] IN (${aux}) AND [UnitID] IN (${unitIds})`;
            }
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
            querySQL += ` AND [SchedID] IS NULL`;
        }

        const res = await request.query(querySQL);

        const totalBackOrders:number = res.recordset[0]?.totalBackOrders || 0;
        const totalPages = Math.ceil(Number(totalBackOrders) / ITEMS_PER_PAGE);

        console.log('++++++++++++++++++++++++++++++++++++++++++', totalPages)
        return totalPages;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}



export async function fetchBackOrdersView(filters: FilterParams){
    console.log('filtros - fetchBackOrdersView', filters)
    try {
        const pool: ConnectionPool = await getDbConnection();

        let querySQL : string = `
        SELECT TOP 15 [V_BACKORDER].[SchedID]
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

        if (filters.loc) {
            querySQL += ` AND [LocationID] = @location`;
            request.input("location", sql.VarChar, `${filters.loc}`);
        }

        if (filters.sch) {
            querySQL += ` AND [V_BACKORDER].[SchedID] IS NULL`;
        }

        const res = await request.query(querySQL);
        const raw: BackOrder[] = res.recordset;
        return raw
    } catch (error) {
        console.error("Error ejecutando la consulta:", error);
        throw new Error('Failed to fetch invoices.');
    }
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
    customerId: string,
) {

    // const dateWith7Days = new Date(expectedDate);
    // dateWith7Days.setDate(expectedDate.getDate() + 7);
    // console.log(dateWith7Days)

    const date1: string = expectedDate.toLocaleDateString('en-US', { timeZone: 'UTC' })
    try {
        const pool: ConnectionPool = await getDbConnection();

        let querySQL : string = `EXEC UnitedDashboard.[dbo].[prc_Backorder_ExpectedDate] '${customerId}',  '${date1}'`;

        const request = pool.request();
        request.input("limit", sql.Int, ITEMS_PER_PAGE);
        const res = await request.query(querySQL);
        const date2: Date = res.recordset[0].Expected_Date;
        
        console.log(date2);

        await prisma.backorderFile.upsert({
            where: {
                codeBckOrd: codeBackOrder,
                scheduleId: Number(scheduleId),
                unitId: Number(unitId),
                orderId: Number(orderId)
            },
            update: {
                expectedDate: expectedDate,
                newDateClient: date2
            },
            create: {
                codeBckOrd: codeBackOrder,
                scheduleId: Number(scheduleId),
                unitId: Number(unitId),
                orderId: Number(orderId),
                expectedDate: expectedDate,
                newDateClient: date2
            },
        })

        return date2.toLocaleDateString('en-US', { timeZone: 'UTC' });

    } catch (error) {
        console.error("Error ejecutando la consulta:", error);
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
        where: filters, select: { orderId: true, unitId: true, codeBckOrd: true}
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

    const filesWithReason = await prisma.backorderFile.findMany()

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