"use server";
import { jwtVerify } from 'jose';
import prisma from '../../../db';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

export async function submitDonation(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
     const {payload} = await jwtVerify(token,JWT_SECRET);
     const userId = payload.id;
  const donation = await prisma.donation.create({
    data: {
      donor_name: data.donor_name,
      contact_number: data.contact_number,
      amount: parseFloat(data.amount),
      notes: data.notes,
      userId:userId
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

export async function getUserEmail(){
  
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
     const {payload} = await jwtVerify(token,JWT_SECRET);
      const userEmail = await prisma.user.findUnique({where:{id:payload.id},
        select:{
          email:true
        }
      });
      console.log("userEmail", userEmail);
      if(userEmail){
        return userEmail.email
      }
      else {
        return "guest@gmail.com"
      }
    
}


export async function getDonatedAmount(){
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const {payload} = await jwtVerify(token,JWT_SECRET);
  const donated = await prisma.donation.aggregate({where:{userId:payload.id},
    _sum:{
      amount:true
    }
  }
  );
  console.log(donated._sum.amount);
  if(donated._sum.amount>0){
    return donated._sum.amount;
  }
  else{
    return 0;
  }
}