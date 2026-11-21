"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getActiveCampaigns, getActiveCampaignsCount } from './actions';

const FILTER_TABS = [
  'All Campaigns',
  'Emergency Food Relief',
  'Winter Warmth & Coats',
  'Mobile Pantry Vans',
  'Infant & Family Kits',
  'Community Fridges',
];

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&w=900&q=80',
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignCount, setCampaignCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Campaigns');

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const [data, count] = await Promise.all([
          getActiveCampaigns(),
          getActiveCampaignsCount(),
        ]);
        setCampaigns(data || []);
        setCampaignCount(count || 0);
      } catch (error) {
        console.error('Failed to load campaigns:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.campaign_name?.toLowerCase().includes(q) ||
      c.campaign_organization?.toLowerCase().includes(q)
    );
  });

  const featured = filteredCampaigns[0] || null;
  const featuredProgress = featured && featured.total > 0
    ? Math.min(Math.round((featured.raised / featured.total) * 100), 100)
    : 0;

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
            <Link href="/campaigns" className="text-emerald-900 font-bold">Campaigns</Link>
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

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
              🛡️ Community Relief Funds • 100% Tax-Deductible 501(c)(3)
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
              Fund Urgent Food Relief &amp;
              <br />
              Community Essentials
            </h1>
            <p className="text-sm text-slate-500 max-w-xl">
              Back verified regional food drives, winter warmth initiatives, and emergency pantries.
              Every dollar goes directly to local hunger relief with instant tax receipts.
            </p>
          </div>

          <Link
            href="/donate"
            className="inline-flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-sm transition self-start md:self-end shrink-0"
          >
            + Start a Community Campaign
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns, organizations, or urgent relief needs..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
              />
            </div>
            <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2.5 rounded-xl shrink-0">
              ✓ 100% Verified Drives
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  activeFilter === tab
                    ? 'bg-emerald-950 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Empty / Campaigns Content */}
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm text-slate-500 font-medium">
            Loading active campaigns...
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
            <p className="text-3xl mb-3">🌿</p>
            <h2 className="text-lg font-bold text-slate-900 mb-1">No campaigns found</h2>
            <p className="text-sm text-slate-500">
              Try clearing your search filter or check back soon for new drives.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Urgent Campaign Card */}
            {featured && (
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm grid lg:grid-cols-12 mb-12">
                <div className="lg:col-span-6 relative min-h-[280px] bg-emerald-950">
                  <img
                    src={PLACEHOLDER_IMAGES[0]}
                    alt={featured.campaign_name}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-amber-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      ● Urgent Relief Drive • {featured.daysLeft} Days Left
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-semibold text-emerald-300 mb-1">
                      {featured.campaign_organization}
                    </p>
                    <h2 className="text-2xl font-extrabold leading-snug">
                      {featured.campaign_name}
                    </h2>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full">
                        🛡️ Verified Direct Appeal
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {featuredProgress}% Funded
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      Directly supporting {featured.campaign_organization} with emergency food
                      distributions, fresh produce boxes, and essential supplies for local families.
                    </p>

                    {/* Raised & Progress Bar */}
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="text-3xl font-extrabold text-slate-900">
                        ${featured.raised}
                        <span className="text-sm font-semibold text-slate-400 ml-1.5">
                          raised of ${featured.total} goal
                        </span>
                      </p>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 mb-5 overflow-hidden">
                      <div
                        className="bg-amber-700 h-2.5 rounded-full transition-all"
                        style={{ width: `${featuredProgress}%` }}
                      />
                    </div>

                    {/* 3-Column Mini Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 rounded-xl p-3 mb-6">
                      <div>
                        <p className="text-sm font-extrabold text-slate-900">
                          ${Math.max(0, (featured.total || 0) - (featured.raised || 0))}
                        </p>
                        <p className="text-[10px] text-slate-500 font-semibold">Remaining</p>
                      </div>
                      <div className="border-x border-slate-200">
                        <p className="text-sm font-extrabold text-slate-900">{featured.daysLeft}d</p>
                        <p className="text-[10px] text-slate-500 font-semibold">Days Left</p>
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-emerald-700">{featuredProgress}%</p>
                        <p className="text-[10px] text-slate-500 font-semibold">Funded</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={{
                      pathname: '/donate',
                      query: {
                        campaignName: featured.campaign_name,
                        campaignId: featured.id,
                      },
                    }}
                    className="w-full text-center bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-sm transition"
                  >
                    Donate to This Drive Now →
                  </Link>
                </div>
              </div>
            )}

            {/* Active Relief Drives Grid */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active Neighborhood Fundraising
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Active Relief Drives in Your Community ({campaignCount})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredCampaigns.map((campaign, idx) => {
                const progress = campaign.total > 0
                  ? Math.min(Math.round((campaign.raised / campaign.total) * 100), 100)
                  : 0;

                return (
                  <div
                    key={campaign.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 bg-slate-200">
                        <img
                          src={PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length]}
                          alt={campaign.campaign_name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-emerald-950/85 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Verified Drive
                        </span>
                        <span className="absolute top-3 right-3 bg-white/95 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          {campaign.daysLeft} days left
                        </span>
                      </div>

                      <div className="p-5">
                        <p className="text-[11px] font-bold text-emerald-700 mb-1">
                          {campaign.campaign_organization}
                        </p>
                        <h3 className="text-base font-extrabold text-slate-900 mb-3 line-clamp-2">
                          {campaign.campaign_name}
                        </h3>

                        <div className="flex items-baseline justify-between text-xs mb-1.5">
                          <span className="font-extrabold text-slate-900 text-sm">
                            ${campaign.raised}
                          </span>
                          <span className="text-slate-400 font-semibold">
                            of ${campaign.total} ({progress}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
                          <div
                            className="bg-emerald-700 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5 flex gap-2">
                      <Link
                        href={{
                          pathname: '/donate',
                          query: {
                            campaignName: campaign.campaign_name,
                            campaignId: campaign.id,
                          },
                        }}
                        className="flex-1 text-center bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold py-3 rounded-xl shadow-sm transition"
                      >
                        Donate to Drive
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          if (typeof navigator !== 'undefined' && navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Campaign link copied!');
                          }
                        }}
                        className="px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                        title="Share campaign"
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Where Every Dollar Goes */}
        <section className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
            📊 100% Transparency • Live Audited Ledger
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
            Where Every Dollar Goes: Real-Time Verified Impact
          </h2>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-slate-900">Every Cent Accounted For: Public Fund Flow</p>
              <span className="text-xs font-bold text-emerald-700">94% Direct Food Aid</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden flex mb-4">
              <div className="bg-emerald-900 w-[94%]" />
              <div className="bg-amber-600 w-[4%]" />
              <div className="bg-slate-400 w-[2%]" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-500">
              <p><span className="font-bold text-slate-900">● 94%</span> Direct Food &amp; Essentials Procurement</p>
              <p><span className="font-bold text-slate-900">● 4%</span> Cold-Chain &amp; Van Logistics</p>
              <p><span className="font-bold text-slate-900">● 2%</span> Safe Storage &amp; Food-Grade Packaging</p>
            </div>
          </div>
        </section>

        {/* Bottom Dark Green Trust Banner */}
        <div className="bg-emerald-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
              HungerNova Give Safe Guarantee
            </p>
            <h2 className="text-2xl font-extrabold mb-2">
              Your Giving is Protected, Verified, and Immediate
            </h2>
            <p className="text-sm text-emerald-200/80">
              All campaign hosts are vetted on-site and partnered exclusively with verified 501(c)(3)
              food rescue hubs.
            </p>
          </div>
          <Link
            href="/donate"
            className="bg-amber-700 hover:bg-amber-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shrink-0"
          >
            Make a Direct Donation →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white mt-12 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© 2026 HungerNova Organization. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/home" className="hover:text-slate-700">Home</Link>
            <Link href="/donate" className="hover:text-slate-700">Donate</Link>
            <Link href="/profile" className="hover:text-slate-700">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}