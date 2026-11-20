"use server";
import { cookies } from 'next/headers';
import prisma from '../../../db';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

export async function submitVolunteer(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const {payload} = await jwtVerify(token,JWT_SECRET); 
  const userId = await payload?.id;
  const volunteer = await prisma.volunteer.create({
    data: {
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
      notes: data.notes,
      userId: userId
    }
  });
  return volunteer;
}


export async function getVolunterCount(){
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  const {payload} = await jwtVerify(token,JWT_SECRET);
  const volunterCount = await prisma.volunteer.count({
    where:{userId:payload.id}
  });
  console.log("volunteer count", volunterCount);
  if(volunterCount>0){
    return volunterCount;
  }
  else{
    return 0;
  }
}