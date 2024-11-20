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
  QuoteNumber: string | 'N/A',
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

export type BackOrder = {
  oKey: string,
  OrderNumber: string,
  CustomerID: string,
  SiteID: string,
  CustomerRef: string,
  PONumber: string,
  Date: string,
  FollowUpDate?: null,
  ExpDate: string,
  ShipDate: string,
  ReqDate: string,
  ReqDateOverride: boolean,
  CreateDate: string,
  MeasureDate: string,
  CompleteDate: string,
  AckDate: string,
  Comments: string,
  EmailStatus: string,
  EmailStatusDate: string,
  PrintDate: string,
  Status: number,
  ShipStatus: number,
  Cancelled: boolean,
  ClosedDate: string,
  Incomplete: false,
  ShipVia: string,
  PackingType?: null,
  PackingNoteID?: null,
  RemoteDropShip: boolean,
  SalesPersonID: number,
  SalesCode: string,
  ShpAddr_CustomerID: string,
  ShpAddr_SiteID: string,
  ShpAddr_ContactName: string,
  ShpAddr_ContactTitle: string,
  ShpAddr_CompanyName: string,
  ShpAddr_Address1: string,
  ShpAddr_Address2: string,
  ShpAddr_City: string,
  ShpAddr_State: string,
}