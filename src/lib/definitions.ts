import { ReactNode } from "react";

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


// function createData(
//   id: number,
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }