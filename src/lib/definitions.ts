export type BackOrder = {
  SchedID: number,
  UnitID: number,
  OrderNumber: string,
  LineItem: number,
  PartNo: string,
  TargetShipDate: Date,
  CUSTOMER: string,
  LocationID: string,
  Category: string
}


export type Reason = {
  id : number,
  title : string 
}