import sql from 'mssql';

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

let pool: sql.ConnectionPool | null = null;

export const getDbConnection = async (): Promise<sql.ConnectionPool> => {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
};
