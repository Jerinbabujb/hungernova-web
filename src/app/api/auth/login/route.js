import { SignJWT } from "jose";
import prisma from "../../../../../db";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');
export async function POST(request){
   try{
 const data = await request.json();
 const login = await prisma.user.findUnique({where:{email:data.email}});
 if(!login) return{error:"invailid login credentials"};
 const isValid = await bcrypt.compare(data.password,login.password);
 if(!isValid) return{error:"invalid password"};
 const token = new SignJWT({id:login.id})
 .setProtectedHeader({alg:'HS256'})
 .setIssuedAt()
 .setExpirationTime('7d')
 .sign(JWT_SECRET);

return NextResponse.json({token, login:{name:login.name,email:login.email}},{status:200})
}
catch(error){
   console.log(error);
}
}