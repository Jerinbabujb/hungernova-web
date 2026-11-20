"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import prisma from "../../../db"; // Adjust path if needed

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "your-super-secret-development-key"
);

export async function changePassword({ currentPassword, newPassword }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { error: "Not authenticated." };

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) return { error: "User not found." };

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return { error: "Current password is incorrect." };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    console.error("Change password error:", error);
    return { error: "Failed to update password." };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}