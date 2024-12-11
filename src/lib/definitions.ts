export interface BackOrder {
  SchedID: number;
  UnitID: number;
  OrderNumber: number;
  PONumber: string;
  LineItem: number;
  TargetShipDate: Date;
  Route: string;
  LocationID: string;
  CustomerID: string;
  CUSTOMER: string;
}

export interface BackOrderFile {
  codeBckOrd?: string;
  scheduleId?: number | null;
  unitId?: number | null;
  orderId?: number | null;
  reasonId?: number | null;
  noteUser?: string | null;
  expectedDate?: Date | null;
  newDateClient?: Date | null;
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



export interface FilterParams {
  ord?: string;
  pon?: string; 
  cus?: string;
  loc?: string,
  pag?: string;
  sch?: string;
  ids?: string;
}