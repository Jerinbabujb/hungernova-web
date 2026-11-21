"use client";
import Link from 'next/link';
import { MOCK_USER } from '@/lib/data';
import { useEffect, useState } from 'react';
import { getDonatedAmount, getUserName } from '../donate/actions';
import { getVolunterCount } from '../volunteer/actions';

const LIVE_FEED = [
  {
    id: 1,
    tag: 'Produce',
    tagColor: 'bg-emerald-50 text-emerald-700',
    time: '12 mins ago',
    title: 'Fresh Organic Apples & Greens (60 lbs)',
    meta: 'Valley Farm Market • Claimed by St. Jude Shelter',
  },
  {
    id: 2,
    tag: 'Warmth & Apparel',
    tagColor: 'bg-amber-50 text-amber-800',
    time: '24 mins ago',
    title: 'Warm Winter Jackets & Kids Boots (15 items)',
    meta: 'Highland Community • Available at East Hub',
  },
  {
    id: 3,
    tag: 'Bakery Goods',
    tagColor: 'bg-orange-50 text-orange-700',
    time: '32 mins ago',
    title: 'Artisan Bagels & Multigrain Loaves (80 units)',
    meta: 'Bardon Bakers • Ready for pickup',
  },
];

export default function Home() {
  const [userName, setUserName] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [showAlert, setShowAlert] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Open Now');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [savedName, savedAmount, savedCount] = await Promise.all([
          getUserName(),
          getDonatedAmount(),
          getVolunterCount(),
        ]);
        setUserName(savedName || '');
        setTotalAmount(savedAmount || 0);
        setVolunteerCount(savedCount || 0);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/home" className="flex items-center gap-2 font-extrabold text-lg tracking-tight text-slate-900">
            <span className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center text-sm">
              🌿
            </span>
            HungerNova
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link href="/request" className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 font-semibold">
              Find Food
            </Link>
            <Link href="/donate" className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition">
              Donate
            </Link>
            <Link href="/campaigns" className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition">
              Campaigns
            </Link>
            <Link href="/volunteer" className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition">
              Volunteer
            </Link>
            <Link href="/mydonations" className="px-3 py-1.5 rounded-lg hover:bg-slate-50 transition">
              My Donations
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {userName && (
              <span className="hidden sm:inline text-sm font-semibold text-slate-700">
                Hi, {userName} 👋
              </span>
            )}
            <Link
              href="/donate"
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              Donate Money
            </Link>
            <Link href="/profile" title="Profile">
              <img
                src={MOCK_USER.avatar}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-emerald-800 object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Emergency Alert Banner */}
      {showAlert && (
        <div className="bg-amber-50 border-b border-amber-200/70">
          <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-amber-950">
              <span>⚠️</span>
              <p>
                <span className="font-bold">EMERGENCY WEATHER ALERT:</span> 14 Mobile Cold-Weather Pantries
                Deployed Across Downtown &amp; East District.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/campaigns" className="font-semibold text-amber-800 hover:underline hidden sm:inline">
                View Live Drives →
              </Link>
              <button
                onClick={() => setShowAlert(false)}
                className="text-amber-800 hover:text-amber-950 font-bold"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              24/7 Food Rescue Network • Real-Time Community Exchange
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900 mb-5">
              Rescue Food.
              <br />
              Share Goods.
              <br />
              <span className="text-amber-700">End Hunger.</span>
            </h1>

            <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-lg">
              Connecting surplus food, warm clothing, and household essentials from local businesses and
              generous neighbors directly to families and individuals in need — safely, with dignity, and
              zero friction.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-7">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition text-sm"
              >
                🍽️ Find Free Food
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition text-sm"
              >
                ❤️ Donate Food or Funds
              </Link>
            </div>

            <p className="text-xs text-slate-500">
              ⭐ 4,800+ active volunteers &amp; local partners • 100% transparent tracking • Zero food wasted
            </p>
          </div>

          {/* Hero Visual Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-emerald-950 h-80 sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
              alt="Community food rescue"
              className="w-full h-full object-cover opacity-90"
            />

            {/* Top Floating Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-3.5 shadow-lg max-w-[230px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
                ● Just Rescued
              </p>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                450 lbs Fresh Sourdough &amp; Greens from GreenLeaf Bakery
              </p>
              <p className="text-[11px] text-slate-400 mt-1">12 mins ago</p>
            </div>

            {/* Bottom Floating Badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-2xl p-3.5 shadow-lg flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-base shrink-0">
                📍
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  Next Drop • Open to All
                </p>
                <p className="text-xs font-bold text-slate-900">
                  2:00 PM Today @ Central Community Plaza
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Transparency & Impact */}
      <section className="bg-slate-50/80 border-y border-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              📊 Real-Time Transparency &amp; Impact
            </p>
            <p className="text-xs text-slate-400">● Live database stats</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">4,250+</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">Meals Rescued</p>
              <p className="text-xs text-slate-400 mt-3">↗ +450 meals this week across local hubs</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">${totalAmount}</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">Total Donated</p>
              <p className="text-xs text-slate-400 mt-3">💚 100% goes directly to rescue operations</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="text-3xl font-extrabold text-slate-900">{volunteerCount}</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">Active Volunteers</p>
              <p className="text-xs text-slate-400 mt-3">🤝 Verified community couriers &amp; hosts</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="text-3xl font-extrabold text-amber-700">142 Active</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">Collection Centers</p>
              <p className="text-xs text-slate-400 mt-3">📍 Open for drop-offs &amp; immediate pickups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Actions */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Immediate Actions
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          How Can We Help You Today?
        </h2>
        <p className="text-sm text-slate-500 mb-8 max-w-xl">
          Whether you are looking for nourishing meals or have surplus items to give back, select an
          action below to participate directly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/request"
            className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl mb-4">
                🍽️
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Request Food Assistance</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Browse open neighborhood pantries, free hot meal kitchens, and mobile delivery with
                zero judgment.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  No ID Required
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Instant Pickup
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition inline-block">
              Find Food Near Me →
            </span>
          </Link>

          <Link
            href="/donate"
            className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl mb-4">
                ❤️
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Donate Food &amp; Funds</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Fund a meal rescue or schedule a contactless porch pickup for surplus groceries and
                essentials.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Tax Deductible
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Same-Day Impact
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 group-hover:translate-x-1 transition inline-block">
              Start a Donation →
            </span>
          </Link>

          <Link
            href="/campaigns"
            className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-4">
                🌿
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Active Campaigns</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Support targeted neighborhood food drives, emergency relief funds, and seasonal
                community goals.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Verified Drives
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Live Progress
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition inline-block">
              Explore Campaigns →
            </span>
          </Link>

          <Link
            href="/volunteer"
            className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-200 transition flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl mb-4">
                👥
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Volunteer &amp; Runs</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Join a local pickup run, help sort surplus produce, or deliver meals to homebound
                neighbors.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Flexible Hours
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  Local Routes
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-700 group-hover:translate-x-1 transition inline-block">
              Join a Local Run →
            </span>
          </Link>
        </div>
      </section>

      {/* Live Activity & Community Network */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Food Rescue Feed */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Live Activity
                </p>
                <h3 className="text-lg font-extrabold text-slate-900">Food Rescue Feed</h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                ● Real-Time
              </span>
            </div>

            <div className="space-y-3">
              {LIVE_FEED.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:border-slate-200 transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.meta}</p>
                </div>
              ))}
            </div>

            <Link
              href="/campaigns"
              className="mt-4 w-full block text-center py-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition"
            >
              View All Active Rescues Today →
            </Link>
          </div>

          {/* Right: Live Hubs Map Preview */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Community Network
              </p>
              <h3 className="text-lg font-extrabold text-slate-900">Live Hubs &amp; Drop-off Centers</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {['Open Now', 'Food Pantries', 'Hot Meals', 'Clothing Drop-off'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    activeFilter === filter
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-sky-50 h-72 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:18px_18px] opacity-60"></div>

              <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-md border border-slate-100 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                  📍
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Central Kitchen Hub</p>
                  <p className="text-[11px] text-slate-500">Hot Meals • Open until 7:00 PM</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white rounded-xl p-3 shadow-md border border-slate-100 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                  📦
                </span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Community Pantry #2</p>
                  <p className="text-[11px] text-slate-500">Groceries &amp; Baby Essentials</p>
                </div>
              </div>

              <p className="relative z-10 text-xs font-semibold text-slate-500 bg-white/80 px-4 py-2 rounded-full border border-slate-200">
                Showing hubs for: <span className="text-slate-900">{activeFilter}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-slate-50/70 py-14 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <img
            src={MOCK_USER.avatar}
            alt="Community Coordinator"
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-700 shrink-0"
          />
          <div>
            <p className="text-amber-700 text-2xl font-serif leading-none mb-2">“</p>
            <p className="text-slate-800 font-semibold text-base sm:text-lg leading-relaxed mb-3">
              HungerNova turned surplus that would have been wasted into dinner for 120 families in our
              block alone every single Thursday.
            </p>
            <p className="text-xs text-slate-500">
              <span className="font-bold text-slate-900">Sarah Jenkins</span> • Community Coordinator,
              Downtown Share Hub
            </p>
          </div>
        </div>
      </section>

      {/* Dark Green CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="bg-emerald-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
              Join the Movement
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3">
              Have surplus food to share? We pick it up within the hour.
            </h2>
            <p className="text-sm text-emerald-200/80">
              Bakeries, restaurants, grocery markets, and corporate cafeterias can register for zero-waste,
              tax-deductible pickups.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/donate"
              className="bg-amber-700 hover:bg-amber-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition"
            >
              Register Surplus Food
            </Link>
            <Link
              href="/volunteer"
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm px-6 py-3.5 rounded-xl transition"
            >
              Volunteer as Courier
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-500 mb-8">
          <div className="col-span-2 md:col-span-1">
            <p className="font-extrabold text-slate-900 text-sm mb-2">🌿 HungerNova</p>
            <p className="leading-relaxed">
              Rescue Food. Share Goods. End Hunger. Connecting surplus resources to neighbors in need.
            </p>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-3">Programs</p>
            <ul className="space-y-2">
              <li><Link href="/request" className="hover:text-slate-900">Find Free Food</Link></li>
              <li><Link href="/donate" className="hover:text-slate-900">Donate Food &amp; Funds</Link></li>
              <li><Link href="/campaigns" className="hover:text-slate-900">Active Campaigns</Link></li>
              <li><Link href="/volunteer" className="hover:text-slate-900">Volunteer Network</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-3">Account</p>
            <ul className="space-y-2">
              <li><Link href="/profile" className="hover:text-slate-900">My Profile</Link></li>
              <li><Link href="/mydonations" className="hover:text-slate-900">My Donations</Link></li>
              <li><Link href="/settings" className="hover:text-slate-900">Settings</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-3">Transparency</p>
            <ul className="space-y-2">
              <li>Impact Reports</li>
              <li>Food Safety Guidelines</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© 2026 HungerNova Organization. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}