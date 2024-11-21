import { ReactNode } from "react";

// export interface Order {
//   Backlog: any;
//   Invoice: any;
//   DealerName: ReactNode;
//   Salesperson: ReactNode;
//   OrderNumber: string;
//   PONumber: string;
//   DealerNumber: string;
//   Price: number;
//   Status: string;
//   OrderDate: string;
//   AcknowledgeDate: string;
//   PromiseDate: string;
//   ProductionScheduleDate: string;
//   ProductionStartDate: string;
//   ProductionEndDate: string;
//   LoadingStartDate: string;
//   ShipDate: string;
//   DeliveryDate: string;
// }

// export interface Order {
//   OrderNumber: string,
//   IsHold: number,
//   PONumber: string,
//   QuoteNumber: string | 'N/A',
//   OrderedDate: string,
//   AcknowledgedDate: string,
//   RequiredDate: string,
//   ParentDealerNumber: string,
//   ParentDealerName: string,
//   DealerNumber:  string,
//   DealerName: string,
//   SalespersonUserId: number,
//   Cost: number
// }

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