import { NextResponse } from "next/server";
import sql from "mssql";
import fs from "fs";
import path from "path";

import getBackOrders from "@/lib/data"
import { BackOrder } from '@/lib/definitions';

export async function GET(request: Request){
  const orders: BackOrder[] = await getBackOrders();
  return NextResponse.json({orders: orders,});
}