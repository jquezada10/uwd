'use server';
import { prisma } from '@/lib/prisma';

export async function fetchVendorsByOrder(codeBackOrderFile: string) {
    const vendorsByOrder = [
        { id: 1, name: 'UNITED W&D' },
        { id: 2, name: 'ABC LLC' },
        { id: 3, name: 'INT LLC' },
        { id: 4, name: 'ZZZ LLC' },
        { id: 5, name: 'LONDON LLC' },
    ];

    return vendorsByOrder;
}

export async function fetchReasonCatergoryByVendor(vendor: string) {
    let vendorSeleted = '';
    vendor.includes('UNITED') ? (vendorSeleted = 'UWD') : (vendorSeleted = 'ALL');

    console.log('----------------------------------', vendorSeleted);
    console.log('vendor-recive', vendor);
    const vendorsByOrder = await prisma.backorderReasonCategory.findMany({
        where: { ownerCategory: vendorSeleted, isActive: true },
        select: { id: true, nameCategory: true, codeCategory: true },
    });
    console.log('es lo que hay', vendorsByOrder);
    return vendorsByOrder;
}

export async function fetchDescriptionReasons(reasonCategoryId: number) {
    console.log(reasonCategoryId, typeof reasonCategoryId);

    const descriptionReasons = await prisma.backorderReasonDescription.findMany({
        where: { reasonCategoryId: reasonCategoryId },
        select: { id: true, nameDescription: true, notesRequeried: true },
    });
    console.log('es lo que hay2', descriptionReasons);
    return descriptionReasons;
}
