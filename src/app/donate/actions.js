"use server";
import { jwtVerify } from 'jose';
import prisma from '../../../db';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

export async function submitDonation(data) {
  const donation = await prisma.donation.create({
    data: {
      donor_name: data.donor_name,
      contact_number: data.contact_number,
      amount: parseFloat(data.amount),
      notes: data.notes
    }
  });
  return donation;
}

export async function getUserName(){
  
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
     const {payload} = await jwtVerify(token,JWT_SECRET);
      const userName = await prisma.user.findUnique({where:{id:payload.id},
        select:{
          name:true
        }
      });
      console.log("username", userName);
      if(userName){
        return userName.name
      }
      else {
        return "Guest"
      }
    
}