"use server";
import prisma from '../../../db';

export async function submitVolunteer(data) {
  const volunteer = await prisma.volunteer.create({
    data: {
      name: data.name,
      contact_number: data.contact_number,
      role: data.role,
      notes: data.notes
    }
  });
  return volunteer;
}