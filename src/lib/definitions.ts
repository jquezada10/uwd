export type BackOrder = {
  SchedID: number,
  UnitID: number,
  OrderNumber: string,
  LineItem: number,
  PartNo: string,
  TargetShipDate: Date,
  CUSTOMER: string,
  LocationID: string,
  Category: string,
  backOrderFile: Object
}

export interface BackOrderRecord {
  codeBckOrd: string;
  scheduleId: number;   
  unitId: number;     
  orderId: number;
  reasonId?: number;
  noteUser?: string;
  expectedDate?: Date;
  newDateClient?: Date;
}