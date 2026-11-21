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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/home" className="flex items-center gap-2 font-extrabold text-lg tracking-tight text-slate-900">
            <span className="w-8 h-8 rounded-lg bg-emerald-950 text-white flex items-center justify-center text-sm">
              🌿
            </span>
            HungerNova
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
            <Link href="/request" className="hover:text-slate-900 transition">Find Food</Link>
            <Link href="/donate" className="hover:text-slate-900 transition">Donate</Link>
            <Link href="/campaigns" className="hover:text-slate-900 transition">Campaigns</Link>
            <Link href="/volunteer" className="hover:text-slate-900 transition">Volunteer</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/profile" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Profile
            </Link>
            <Link
              href="/donate"
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              Donate Money
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
              🧾 501(c)(3) Giving History • Verified Receipts
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">My Donations</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track every contribution you&apos;ve made to local food rescues and relief drives.
            </p>
          </div>
          <Link
            href="/profile"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            ← Back to Profile
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Summary & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-4">
                Your Giving Summary
              </p>

              <div className="grid grid-cols-2 gap-3 bg-emerald-900/70 rounded-2xl p-4 text-center mb-5">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                    ${totalDonated}
                  </p>
                  <p className="text-[11px] text-emerald-200 font-semibold mt-1">Total Donated</p>
                </div>
                <div className="border-l border-emerald-800">
                  <p className="text-2xl sm:text-3xl font-extrabold">{donations.length}</p>
                  <p className="text-[11px] text-emerald-200 font-semibold mt-1">Contributions</p>
                </div>
              </div>

              <Link
                href="/donate"
                className="block w-full text-center bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold py-3.5 rounded-xl transition"
              >
                Make Another Donation →
              </Link>
            </div>

            <div className="bg-orange-50/70 rounded-2xl p-5 border border-orange-100">
              <p className="text-xs font-extrabold text-amber-900 mb-1.5">
                🛡️ Tax-Deductible Contributions
              </p>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                100% of your donations go directly toward rescuing surplus food and funding
                emergency community pantries.
              </p>
            </div>
          </div>

          {/* Right Column: Donations List */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                <p className="text-sm text-slate-500 font-medium">Loading your donations...</p>
              </div>
            ) : donations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl mx-auto mb-4">
                  ❤️
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mb-1">No donations yet</h2>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                  Your contributions will appear here once you make your first donation to a local
                  rescue or campaign.
                </p>
                <Link
                  href="/donate"
                  className="inline-block bg-emerald-950 hover:bg-emerald-900 text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-sm transition"
                >
                  Make a Donation →
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-slate-900">Transaction History</h2>
                  <span className="text-xs font-semibold text-slate-400">
                    {donations.length} {donations.length === 1 ? "record" : "records"}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {donations.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-6 py-5 hover:bg-slate-50/80 transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg shrink-0">
                          ❤️
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900">
                            {item.campaign?.campaign_name || "General Donation"}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {new Date(item.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-slate-400 italic mt-1 line-clamp-1">
                              “{item.notes}”
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-extrabold text-emerald-800 text-lg">
                          +${item.amount}
                        </span>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mt-0.5">
                          Completed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white mt-12 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© 2026 HungerNova Organization. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/home" className="hover:text-slate-700">Home</Link>
            <Link href="/profile" className="hover:text-slate-700">Profile</Link>
            <Link href="/donate" className="hover:text-slate-700">Donate</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}