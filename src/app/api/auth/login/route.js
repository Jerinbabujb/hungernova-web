import { SignJWT } from "jose";
import prisma from "../../../../../db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');
export async function POST(request){
   try{
 const data = await request.json();
 const login = await prisma.user.findUnique({where:{email:data.email}});
 if (!login) {
      return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 });
    }
 const isValid = await bcrypt.compare(data.password,login.password);
if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
 const token = await new SignJWT({id:login.id})
 .setProtectedHeader({alg:'HS256'})
 .setIssuedAt()
 .setExpirationTime('7d')
 .sign(JWT_SECRET);

return NextResponse.json({token, login:{name:login.name,email:login.email}},{status:200})
}
catch(error){
   return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
}