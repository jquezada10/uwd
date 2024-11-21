import sql from "mssql";

type DbConfig = {
  server: string;
  user: string;
  password: string;
  trustServerCertificate: boolean;
  requestTimeout: number;
};

const dbConfig: DbConfig = {
  server: process.env.DB_SERVER!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  trustServerCertificate: true,
  requestTimeout: 300000,
};

export const dbpool = new sql.ConnectionPool(dbConfig);
