"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, signUp } from './actions';

export default function AuthPage() {
  const router = useRouter();

  // Toggle state
  const [isLogin, setIsLogin] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await signUp({ name, email, password });
      }
      router.replace('/home');
    } catch (error) {
      console.error("Auth error:", error);
      alert("Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (loginMode) => {
    setIsLogin(loginMode);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-100">
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
            <button
              type="button"
              onClick={() => switchMode(true)}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Sign In
            </button>
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {/* Top Dark Green Banner */}
        <div className="bg-emerald-950 text-white rounded-2xl px-6 py-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-lg shrink-0">
              🤝
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Community Mutual Aid Network • Live Coordination Active
              </p>
              <p className="text-sm sm:text-base font-bold">
                18,490+ neighbors keeping food on tables this week
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-900/90 border border-emerald-800 px-3.5 py-1.5 rounded-full self-start sm:self-center shrink-0">
            🛡️ 501(c)(3) Public Charity
          </span>
        </div>

        {/* Two-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Community Hub + Promise + Stats */}
          <div className="lg:col-span-5 space-y-6">
            {/* Community Hub Testimonial Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="relative h-48 bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80"
                  alt="Community Hub"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-emerald-950/85 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Community Hub
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium">
                  <span className="bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    📍 Crown Heights Share Station #4
                  </span>
                  <span className="bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                    Updated 12m ago
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-slate-700 italic leading-relaxed mb-4">
                  “HungerNova connected our artisanal bakery surplus with three local shelters within
                  25 minutes of closing. No waste, zero friction, just pure neighborly care.”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                    MR
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Marcus Reyes</p>
                    <p className="text-[11px] text-slate-500">
                      Owner, Hearth &amp; Harvest Bakery (Donor Partner)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The HungerNova Promise */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-sm font-extrabold text-slate-900 mb-4">The HungerNova Promise</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-emerald-950 text-white flex items-center justify-center text-sm shrink-0">
                    🛡️
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">100% Cash-Free Community Access</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                      Food rescues and free pantry distributions never charge fees or ask for payments
                      from recipients.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center text-sm shrink-0">
                    ⚖️
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Bill Emerson Act Protected</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                      Full Federal Good Samaritan legal protection and verified food safety protocols
                      for commercial kitchen donors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-sm shrink-0">
                    🔒
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Zero Spam &amp; Private Records</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                      Recipient dignity is strictly respected. Your home address and recipient history
                      are never sold or shared.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3-Stat Strip */}
            <div className="bg-slate-100/90 rounded-2xl p-5 grid grid-cols-3 gap-2 text-center border border-slate-200/60">
              <div>
                <p className="text-xl font-extrabold text-slate-900">1.4M+</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                  Pounds Diverted
                </p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-amber-700">420+</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                  Partner Pantries
                </p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900">12 min</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                  Avg Pickup Match
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Auth Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
            {/* Pill Tab Toggle */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => switchMode(true)}
                className={`py-2.5 text-sm font-bold rounded-lg transition ${
                  isLogin
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                → Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode(false)}
                className={`py-2.5 text-sm font-bold rounded-lg transition ${
                  !isLogin
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                + Create Free Account
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1.5">
                {isLogin ? 'Welcome Back' : 'Join HungerNova'}
              </h1>
              <p className="text-sm text-slate-500">
                {isLogin
                  ? 'Log in to check local drop-offs, rescue runs, and community pantry dispatches.'
                  : 'Create your free account to donate surplus food, request assistance, or volunteer.'}
              </p>
            </div>

            {/* Social Buttons (UI placeholders) */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-sm font-semibold text-slate-700 transition"
              >
                <span className="font-bold text-red-500">G</span> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-sm font-semibold text-slate-700 transition"
              >
                <span></span> Apple
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Or continue with email
              </span>
              <div className="border-t border-slate-200 w-full"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <span className="text-[11px] text-slate-400">e.g. maria@neighborhood.org</span>
                </div>
                <input
                  type="email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-xs font-semibold text-amber-700 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                    placeholder={isLogin ? '••••••••••••' : 'Create a password (min 6 chars)'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={!isLogin ? 6 : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="rounded accent-emerald-900"
                    />
                    Keep me signed in
                  </label>
                  <button type="button" className="font-semibold text-slate-500 hover:text-slate-800">
                    ✨ Email Passwordless Magic Link
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-xl shadow-sm transition disabled:opacity-50"
              >
                {loading
                  ? 'Please wait...'
                  : isLogin
                  ? 'Sign In to HungerNova →'
                  : 'Create Free Account →'}
              </button>
            </form>

            {/* Bottom Switch Box */}
            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {isLogin ? 'New to HungerNova?' : 'Already have an account?'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isLogin
                    ? 'Join free to rescue perishables or access groceries.'
                    : 'Sign in to view your donations and active runs.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => switchMode(!isLogin)}
                className="shrink-0 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                {isLogin ? 'Sign Up Free' : 'Sign In'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>🔒 256-Bit SSL Encryption</span>
              <span>🛡️ Strict Privacy Standard</span>
              <span>❤️ Volunteer Supported</span>
            </div>
          </div>
        </div>

        {/* Dispatch Help Strip */}
        <div className="mt-8 bg-white rounded-2xl px-6 py-4 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            ℹ️ Need assistance signing up or coordinating an urgent corporate surplus donation?{' '}
            <span className="font-bold text-slate-800">Contact our 24/7 Dispatch Team.</span>
          </p>
          <div className="flex items-center gap-4 shrink-0 font-semibold text-slate-600">
            <span>Food Safety Act Info</span>
            <span>Volunteer Handbook</span>
            <span>Tax Exemption Details</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white mt-12 py-10 px-6">
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
              <li><Link href="/donate" className="hover:text-slate-900">Donate Food &amp; Groceries</Link></li>
              <li><Link href="/campaigns" className="hover:text-slate-900">Active Campaigns</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-3">Network &amp; Locations</p>
            <ul className="space-y-2">
              <li>Collection Centers</li>
              <li>Corporate Partners</li>
              <li>Volunteer Network</li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-3">Transparency &amp; Help</p>
            <ul className="space-y-2">
              <li>Support Center</li>
              <li>Impact Reports</li>
              <li>Food Safety Guidelines</li>
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