export interface BackOrder {
  SchedID: number;
  UnitID: number;
  OrderNumber: number;
  LineItem: number;
  PartNo: string;
  TargetShipDate: Date;
  CustomerID: string;
  CUSTOMER: string;
  LocationID: string;
  Category: string;
}

export interface BackOrderFile {
  codeBckOrd: string;
  scheduleId: number | null;
  unitId: number | null;
  orderId: number | null;
  reasonId: number | null;
  noteUser: string | null;
  expectedDate: Date | null;
  newDateClient: Date | null;
}

export type BackOrderGeneral = BackOrder & BackOrderFile


export interface SearchParams{
  ord?: string;
  cus?: string;
  loc?: string,
  pag: number;
  sch?: string;
  files?: Array<{}>;
  reas?: number;
}

export interface OrderUnitFile{
  orderId : number;
  unitId : number;
  codeBckOrd : string;
}