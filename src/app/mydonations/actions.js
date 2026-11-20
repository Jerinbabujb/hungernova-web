"use server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "../../../db";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

export async function getMyDonations(){
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    const {payload} = await jwtVerify(token, JWT_SECRET);
    const donations = await prisma.donation.findMany({
        where:{
            userId:payload.id
        },
        select:{
            amount:true,
            createdAt:true
        }
    }); 
    if(donations){
        return donations;
    }
    else{
        return "No donations made yet";
    }
}