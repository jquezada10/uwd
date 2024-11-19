import sql from "mssql";

type DbConfig = {
  server: string;
  user: string;
  password: string;
  trustServerCertificate: boolean;
  requestTimeout: number;
};

const portalDbConfig: DbConfig = {
  server: process.env.DB_SERVER!,
  user: process.env.DB_PORTAL_USER!,
  password: process.env.DB_PORTAL_PASSWORD!,
  trustServerCertificate: true,
  requestTimeout: 300000,
};

export const database = new sql.ConnectionPool(portalDbConfig);