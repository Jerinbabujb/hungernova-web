"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "../../../../db"; // Adjust path to your db.js

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "your-super-secret-development-key"
);

export async function updateProfile(data) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return { error: "Not authenticated" };
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    await prisma.user.update({
      where: { id: payload.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    return { success: true };
  } catch (error) {
    // Handle duplicate email error (Prisma code P2002)
    if (error.code === "P2002") {
      return { error: "That email is already in use." };
    }
    console.error("Update profile error:", error);
    return { error: "Failed to update profile." };
  }
}