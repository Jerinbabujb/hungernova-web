import { NextResponse } from 'next/server';
import prisma from '../../../../db';
import { login } from '@/app/actions';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || 'your-super-secret-development-key'
);

async function getUserIdFromRequest(request){
  const authHeader = request.headers.get('authorization');
  if(!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const {payload} = await jwtVerify(token, JWT_SECRET);
  return payload.id;
}
export async function POST(request) {

    try{
      const userId = await getUserIdFromRequest(request);
        const data = await request.json();
         const donation = await prisma.donation.create({
    data: {
      donor_name: data.donor_name,
      contact_number: data.contact_number,
      amount: parseFloat(data.amount),
      notes: data.notes,
      userId: userId
    }
  });
    return NextResponse.json(donation);

    }
    catch (error) {
    console.error("Donation API Error:", error);
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 });
  }
}

export async function GET(request){
  try{
    const userId = await getUserIdFromRequest(request);
    const donations = await prisma.donation.findMany({
      where:{userId:userId}
    });
    const totalAmount = donations.reduce((sum, item)=>sum+Number(item.amount+0||0),0);
   return NextResponse.json({donations, totalAmount});
  }
  catch (error) {
    console.error("Donation API Error:", error);
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 });
  }
}