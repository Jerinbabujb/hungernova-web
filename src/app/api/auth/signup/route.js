import { SignJWT } from "jose";
import prisma from "../../../../../db";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');


export async function POST(request){
    try{
    const data = await request.json();
    if(!data) return{error:"No data entered"};
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    const hashPassword = await bcrypt.hash(data.password,10);
    const signup = await prisma.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:hashPassword
        }
    });
    const token = await SignJWT({id:signup.id})
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

    return NextResponse.json({token,signup:{name:signup.name,email:signup.email}},{status:200});
    }

    catch(error){
        console.log(error);
    }
}