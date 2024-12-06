import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export function GET(request: Request) {
  return NextResponse.json('GET Response correct!')
}

export async function POST(request: Request) {
  const data = await request.json()
  const backorder = await prisma.backorderFile.upsert({
    where: {
      codeBckOrd: data.backorderFile.codeBckOrd,
      scheduleId: data.backorderFile.scheduleId,
      unitId: Number(data.backorderFile.unitId),
      orderId: Number(data.backorderFile.orderId)
    },
    update: {
      reasonId: data.reasonId,
    },
    create: {
      codeBckOrd: data.backorderFile.codeBckOrd,
      scheduleId: data.backorderFile.scheduleId,
      unitId: data.backorderFile.unitId,
      orderId: Number(data.backorderFile.orderId),
      reasonId: data.reasonId,
    },
  })

  console.log('new-id-backOrderFile', backorder.id)
  return NextResponse.json(backorder)
}

export function PUT(request: Request) {
  return NextResponse.json('PUT Response correct!')
}

