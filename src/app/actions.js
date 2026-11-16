"use server";
import { SignJWT } from "jose";
import prisma from "../../db"
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

async function setAuthCookie(userId){
    const token = await new SignJWT({id:userId})
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

    const cookieStore = await cookies();
    cookieStore.set('auth_token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'lax',
        maxAge:60*60*24*7,
        path:'/'
    });
}
export async function signUp (data){
   const existingUser = await prisma.user.findUnique({where:{email:data.email}});
   if (existingUser) return { error: "Email is already registered." };

   const hashPassword = await bcrypt.hash(data.password,10);

   const createUser = await prisma.user.create({
    data:{
        name:data.name,
        email:data.email,
        password:hashPassword
    }
   });
   await setAuthCookie(createUser.id);
   return{success:true};
}

export async function login(data){
    const user = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });
    if(!user){
        return{error:"No user found"};
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid) return{error:"the password is wrong"};
    await setAuthCookie(user.id);
    return {success:true};
}

export async function logout(){
    const cookieStore = new cookies();
    cookieStore.delete('auth_token');
    return {success:true};
}