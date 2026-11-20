"use server";
import prisma from '../../../db';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

export async function getActiveCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return campaigns;
}

export async function getActiveCampaignsCount() {
  const campaignsCount = await prisma.campaign.count();
  return campaignsCount;
}