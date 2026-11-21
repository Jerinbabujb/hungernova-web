"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitVolunteer } from './actions';
import { getUserName } from '../donate/actions';

const VOLUNTEER_ROLES = [
  {
    id: 'Delivery Driver',
    icon: '🚐',
    desc: 'Pick up surplus from local bakeries & grocers and deliver to hubs.',
  },
  {
    id: 'Food Sorter',
    icon: '📦',
    desc: 'Inspect, pack, and organize fresh produce and pantry staples.',
  },
  {
    id: 'Kitchen Prep',
    icon: '🍲',
    desc: 'Help prepare warm, nourishing community meals at partner kitchens.',
  },
  {
    id: 'Event Staff',
    icon: '🤝',
    desc: 'Coordinate neighborhood pop-up distributions and welcome families.',
  },
];

export default function Volunteer() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getName = async () => {
      const data = await getUserName();
      setUserName(data || '');
    };
    getName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert('Please select a volunteer role.');
      return;
    }

    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await submitVolunteer({
        name: userName,
        contact_number: formData.get('contact_number'),
        role: selectedRole,
        notes: formData.get('notes'),
      });
      alert('Thank you for signing up to volunteer!');
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('Error submitting volunteer form.');
    } finally {
      setSaving(false);
    }
  };

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
            <Link href="/volunteer" className="text-emerald-900 font-bold">Volunteer</Link>
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
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
            🤝 Community Courier &amp; Hub Network • Flexible Shifts
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Volunteer With HungerNova
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Join local neighbors rescuing surplus food and delivering meals directly to families
            across the community—even 2 hours a week makes a measurable difference.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Volunteer Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Volunteer Registration</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose a role below and let us know when you&apos;re typically available.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contact_number"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                  required
                />
              </div>
            </div>

            {/* Role Selection Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Interested Role <span className="text-red-500">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {VOLUNTEER_ROLES.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-700 ring-1 ring-emerald-700'
                          : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${
                          isSelected ? 'bg-emerald-950 text-white' : 'bg-white text-slate-700'
                        }`}
                      >
                        {role.icon}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold text-slate-900">{role.id}</p>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{role.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Availability &amp; Notes
              </label>
              <textarea
                name="notes"
                rows={4}
                placeholder="What days/times are you typically free? Let us know if you have a vehicle or preferred neighborhood."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-4 rounded-xl shadow-md transition disabled:opacity-50"
            >
              {saving ? 'Submitting...' : 'Sign Up to Volunteer →'}
            </button>
          </form>

          {/* Right Column: Info, Impact & Checklist */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dark Green Highlight Card */}
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
                Why Volunteer With Us
              </p>
              <h3 className="text-xl font-extrabold leading-snug mb-3">
                1 rescue run saves an average of 85 lbs of fresh food.
              </h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-5">
                You pick your own shifts—no minimum weekly commitment required. We provide insulated
                transport bags, route coordination, and verified community service hours.
              </p>
              <div className="grid grid-cols-3 gap-2 text-center bg-emerald-900/70 rounded-xl p-3">
                <div>
                  <p className="text-lg font-extrabold">2 hrs</p>
                  <p className="text-[10px] text-emerald-200">Avg Shift</p>
                </div>
                <div className="border-x border-emerald-800">
                  <p className="text-lg font-extrabold">142</p>
                  <p className="text-[10px] text-emerald-200">Local Hubs</p>
                </div>
                <div>
                  <p className="text-lg font-extrabold">24/7</p>
                  <p className="text-[10px] text-emerald-200">Dispatch</p>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-extrabold text-slate-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Sign Up &amp; Pick Your Role</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Submit your contact info and preferred shift availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Quick 10-Min Orientation</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Our coordinator reaches out with food-safety basics and nearby hubs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Claim Shifts Anytime</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Accept local pickups or kitchen shifts whenever your schedule allows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Note */}
            <div className="bg-orange-50/70 rounded-2xl p-5 border border-orange-100">
              <p className="text-xs font-extrabold text-amber-900 mb-1.5">
                🛡️ Volunteer Protection &amp; Support
              </p>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">
                All active volunteers are covered under HungerNova&apos;s community safety guidelines
                and receive 24/7 dispatch support during every run.
              </p>
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