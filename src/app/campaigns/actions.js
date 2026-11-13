"use server";
import prisma from '../../../db';

export async function getActiveCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return campaigns;
}