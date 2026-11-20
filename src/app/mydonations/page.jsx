"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyDonations } from "./actions";

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDonation = async () => {
      try {
        const savedDonations = await getMyDonations();
        setDonations(savedDonations || []);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      } finally {
        setLoading(false);
      }
    };
    getDonation();
  }, []);

  const totalDonated = donations.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto pb-12">
        <Link href="/profile" className="text-gray-500 mb-4 inline-block hover:text-gray-700 transition">
          ← Back
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">My Donations</h1>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <p className="text-2xl font-extrabold text-green-700">${totalDonated}</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Total Donated</p>
            </div>
            <div className="w-px h-10 bg-gray-200 mx-2"></div>
            <div className="flex-1">
              <p className="text-2xl font-extrabold text-green-700">{donations.length}</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Contributions</p>
            </div>
          </div>
        </div>

        {/* Donations List */}
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Loading your donations...</p>
          </div>
        ) : donations.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
            <p className="text-3xl mb-3">❤️</p>
            <h2 className="text-lg font-bold text-gray-900 mb-1">No donations yet</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your contributions will appear here once you make a donation.
            </p>
            <Link
              href="/donate"
              className="inline-block w-full bg-green-700 text-white font-bold py-3 rounded-xl shadow-md hover:bg-green-800 transition"
            >
              Make a Donation
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {donations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-lg">
                    ❤️
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {item.campaign?.campaign_name || "General Donation"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    {item.notes && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                        “{item.notes}”
                      </p>
                    )}
                  </div>
                </div>
                <span className="font-extrabold text-green-700 text-lg">
                  +${item.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}