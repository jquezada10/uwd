import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BackOrderRecord } from '@/lib/definitions';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const codeBckOrd = searchParams.get('codeBckOrd') || '';
  console.log('---> consultado este parametro', codeBckOrd);

  const backOrderFile = await prisma.backorderFile.findUnique({
    where: { codeBckOrd: codeBckOrd }
  })
  
  console.log('backOrderFile =====> ', backOrderFile)

  if(!backOrderFile){
    return NextResponse.json({
      codeBckOrd: codeBckOrd,
      scheduleId: null,  
      unitId: null,  
      orderId: null,
      reasonId: null,
      noteUser: '',
      expectedDate: null,
      newDateClient: null,
    });
  }

  return NextResponse.json(backOrderFile);
}