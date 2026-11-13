"use server";
import prisma from '../../../db'; // Adjust path to your db.js if needed

export async function submitFoodRequest(data) {
  // Write securely to the database on the server
  const request = await prisma.request.create({
    data: {
      name: data.name,
      contact_number: data.contact_number,
      type: data.type,
      notes: data.notes
    }
  });
  
  return request;
}