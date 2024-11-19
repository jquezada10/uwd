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

export interface Order {
  OrderNumber: string,
  IsHold: number,
  PONumber: string,
  QuoteNumber: string,
  OrderedDate: string,
  AcknowledgedDate: string,
  RequiredDate: string,
  ParentDealerNumber: string,
  ParentDealerName: string,
  DealerNumber:  string,
  DealerName: string,
  SalespersonUserId: number,
  Cost: number
}