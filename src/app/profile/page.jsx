"use client";
import Link from 'next/link';
import { MOCK_USER } from '@/lib/data';
import { useEffect, useState } from 'react';
import { getDonatedAmount, getUserEmail, getUserName } from '../donate/actions';

const MENU_ITEMS = [
  {
    id: '1',
    title: 'Edit Profile',
    desc: 'Update your name, contact details, and avatar',
    icon: '👤',
    href: '/profile/edit',
  },
  {
    id: '2',
    title: 'My Donations',
    desc: 'View your donation history and tax-deductible receipts',
    icon: '❤️',
    href: '/mydonations',
  },
  {
    id: '3',
    title: 'Notifications',
    desc: 'Manage rescue alerts, pickup updates, and campaign news',
    icon: '🔔',
    href: '/notifications',
  },
  {
    id: '4',
    title: 'Settings',
    desc: 'Security, password updates, and account preferences',
    icon: '⚙️',
    href: '/settings',
  },
];

export default function Profile() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [savedName, savedEmail, savedAmount] = await Promise.all([
          getUserName(),
          getUserEmail(),
          getDonatedAmount(),
        ]);
        setUserName(savedName || '');
        setUserEmail(savedEmail || '');
        setTotalAmount(savedAmount || 0);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

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
            <Link href="/profile" className="text-sm font-bold text-emerald-900">
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
              Member Account • Verified Community Member
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Your Profile</h1>
          </div>
          <Link
            href="/home"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Identity & Impact Summary */}
          <div className="lg:col-span-5 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={MOCK_USER.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-900 mx-auto"
                />
                <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center border-2 border-white">
                  ✓
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                {loading ? 'Loading...' : userName || 'Community Member'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{userEmail}</p>

              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                🌿 HungerNova Supporter
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                <Link
                  href="/profile/edit"
                  className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold py-3 rounded-xl transition"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/mydonations"
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-3 rounded-xl transition"
                >
                  My Donations
                </Link>
              </div>
            </div>

            {/* Your Impact Card */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 text-center mb-4">
                Your Personal Impact
              </p>
              <div className="grid grid-cols-3 gap-2 text-center bg-emerald-900/70 rounded-2xl p-4">
                <div>
                  <p className="text-2xl font-extrabold">{MOCK_USER.impact.mealsRescued}</p>
                  <p className="text-[11px] text-emerald-200 font-semibold mt-0.5">Meals</p>
                </div>
                <div className="border-x border-emerald-800">
                  <p className="text-2xl font-extrabold text-amber-400">${totalAmount}</p>
                  <p className="text-[11px] text-emerald-200 font-semibold mt-0.5">Donated</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{MOCK_USER.impact.campaigns}</p>
                  <p className="text-[11px] text-emerald-200 font-semibold mt-0.5">Campaigns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Account Menu & Log Out */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900">Account &amp; Preferences</h3>
              </div>

              <div className="divide-y divide-slate-100">
                {MENU_ITEMS.map((item) => (
                  <Link
                    href={item.href}
                    key={item.id}
                    className="flex items-center gap-4 px-6 py-5 hover:bg-slate-50 transition group"
                  >
                    <span className="w-11 h-11 rounded-xl bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center text-xl shrink-0 transition">
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition font-bold">
                      ❯
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Log Out Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">Sign Out</p>
                <p className="text-xs text-slate-500">
                  Log out of your HungerNova session on this device.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex justify-center items-center bg-red-50 text-red-600 font-bold text-xs px-6 py-3 rounded-xl border border-red-200 hover:bg-red-100 transition shrink-0"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white mt-12 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© 2026 HungerNova Organization. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/home" className="hover:text-slate-700">Home</Link>
            <Link href="/donate" className="hover:text-slate-700">Donate</Link>
            <Link href="/campaigns" className="hover:text-slate-700">Campaigns</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}