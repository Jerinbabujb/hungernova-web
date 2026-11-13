"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getActiveCampaigns } from './actions';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const data = await getActiveCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to load campaigns:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCampaigns();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <Link href="/home" className="text-gray-500 mb-4 inline-block hover:text-gray-900">← Back</Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Active Campaigns</h1>
        
        {loading ? (
          <div className="text-center text-gray-500 py-10 font-medium">Loading campaigns...</div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const progress = Math.min((campaign.raised / campaign.total) * 100, 100);
              return (
                <div key={campaign.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">{campaign.campaign_name}</h2>
                  <p className="text-sm text-gray-500 font-medium mb-4">{campaign.campaign_organization}</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-green-700 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-6">
                    <p><span className="font-bold text-green-700">${campaign.raised}</span> raised of ${campaign.total}</p>
                    <p>{campaign.daysLeft} days left</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-green-50 text-green-700 font-semibold py-3 rounded-xl border border-green-700 hover:bg-green-100 transition">
                      Support
                    </button>
                    <Link href={`/donate?id=${campaign.id}&title=${encodeURIComponent(campaign.campaign_name)}`} className="flex-1 text-center bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-800 transition">
                      Donate
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}