import { NextResponse } from 'next/server';
import prisma from '../../../../db';

export async function POST(request) {

    try{
        const data = await request.json();
         const donation = await prisma.donation.create({
    data: {
      donor_name: data.donor_name,
      contact_number: data.contact_number,
      amount: parseFloat(data.amount),
      notes: data.notes
    }
  });
    return NextResponse.json(donation);

    }
    catch (error) {
    console.error("Donation API Error:", error);
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 });
  }


 
}