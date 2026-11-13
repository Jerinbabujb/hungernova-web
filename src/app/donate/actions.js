"use server";
import prisma from '../../../db';

export async function submitDonation(data) {
  const donation = await prisma.donation.create({
    data: {
      donor_name: data.donor_name,
      contact_number: data.contact_number,
      amount: parseFloat(data.amount),
      notes: data.notes
    }
  });
  return donation;
}