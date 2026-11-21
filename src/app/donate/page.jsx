"use client";
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserName, submitDonation } from './actions';

const DONATION_AMOUNTS = ['10', '25', '50', '100'];

const DONATION_TABS = [
  { id: 'money', label: 'Donate Money' },
  { id: 'food', label: 'Donate Food' },
  { id: 'goods', label: 'Donate Clothing, Furniture & Electronics' },
];

const DESTINATIONS = [
  {
    id: 'direct',
    title: 'Direct Donation',
    desc: 'Matched directly with a local family in need',
    icon: '🤝',
  },
  {
    id: 'hub',
    title: 'Collection Center Drop-off',
    desc: 'Drop off at 142+ verified neighborhood hubs',
    icon: '🏢',
  },
  {
    id: 'barter',
    title: 'Community Barter',
    desc: 'List on the cashless neighbor-to-neighbor exchange',
    icon: '⇄',
  },
  {
    id: 'auction',
    title: 'Charity Auction',
    desc: 'Auctioned to fund emergency grocery boxes — 100% proceeds',
    icon: '🔨',
  },
];

const ITEM_CATEGORIES = [
  'Adults Clothing',
  'Kids & Babies',
  'Furniture',
  'Electronics',
  'School Supplies',
];

function DonateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignName = searchParams.get('campaignName');
  const campaignId = searchParams.get('campaignId');

  // Core form state
  const [donorName, setDonorName] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('25');
  const [saving, setSaving] = useState(false);

  // UI tab & item options state
  const [activeTab, setActiveTab] = useState('money');
  const [destination, setDestination] = useState('direct');
  const [category, setCategory] = useState('Adults Clothing');
  const [condition, setCondition] = useState('Gently Used (Clean & Working)');
  const [quantity, setQuantity] = useState(3);
  const [pickupDate, setPickupDate] = useState('Tomorrow');
  const [timeWindow, setTimeWindow] = useState('9:00 AM - 12:00 PM');

  useEffect(() => {
    const getUser = async () => {
      const name = await getUserName();
      setDonorName(name || '');
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      await submitDonation({
        donor_name: donorName,
        contact_number: formData.get('contact_number'),
        amount:
          activeTab === 'money'
            ? selectedAmount === 'Custom'
              ? formData.get('custom_amount')
              : selectedAmount
            : 0,
        notes: formData.get('notes'),
        campaignId: campaignId || null,
      });
      alert('Thank you for your donation!');
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('Error processing donation.');
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
            <Link href="/donate" className="text-emerald-900 font-bold">Donate</Link>
            <Link href="/campaigns" className="hover:text-slate-900 transition">Campaigns</Link>
            <Link href="/volunteer" className="hover:text-slate-900 transition">Volunteer</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/profile" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Profile
            </Link>
            <Link
              href="/mydonations"
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              My Donations
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Page Header + Tab Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
              🛡️ 501(c)(3) Tax-Deductible • Direct Community Impact
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              {campaignName ? `Donate to ${campaignName}` : 'Make a Donation'}
            </h1>
            <p className="text-sm text-slate-500 max-w-xl">
              Every donated item or dollar directly supports local families in need and funds
              community food rescue—with instant tax-deductible receipts.
            </p>
          </div>

          {/* 3-Mode Pill Switcher */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 self-start lg:self-end">
            {DONATION_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Donation Form */}
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Money Donation Card */}
            {activeTab === 'money' ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-slate-900">Select Donation Amount</h2>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    100% Direct Relief
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                  {DONATION_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-3 rounded-xl border text-sm font-extrabold transition ${
                        selectedAmount === amount
                          ? 'bg-emerald-950 text-white border-emerald-950 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('Custom')}
                    className={`py-3 rounded-xl border text-sm font-extrabold transition ${
                      selectedAmount === 'Custom'
                        ? 'bg-emerald-950 text-white border-emerald-950 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {selectedAmount === 'Custom' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Custom Amount ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="custom_amount"
                      min="1"
                      placeholder="Enter amount"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
                      required
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Goods / Food Item Details Cards */
              <>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-extrabold text-slate-900">Item Photos</h2>
                    <span className="text-[11px] font-semibold text-slate-400">Up to 5 photos</span>
                  </div>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center bg-slate-50/70">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 text-lg">
                      ☁️
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      Drag &amp; drop photos here, or <span className="underline text-emerald-800">browse</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      JPG, PNG • Helps recipients &amp; couriers verify items
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Item Category</label>
                    <div className="flex flex-wrap gap-2">
                      {ITEM_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                            category === cat
                              ? 'bg-emerald-950 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Item Condition</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                      {['New (with tags)', 'Gently Used (Clean & Working)'].map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => setCondition(cond)}
                          className={`py-2 rounded-lg text-xs font-bold transition ${
                            condition === cond
                              ? 'bg-emerald-950 text-white shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Quantity</label>
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-slate-700"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold text-slate-900">{quantity} items</span>
                        <button
                          type="button"
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Approx. Weight / Size (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 24 × 18 in • ~15 lbs"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Donor Information Card (Required by submitDonation) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
              <h2 className="text-base font-extrabold text-slate-900">Donor Details</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="donor_name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Brief Description / Message (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Add a note for the community hub or recipient..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Choose Destination */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-900 mb-4">Choose Destination</h2>
              <div className="space-y-2.5">
                {DESTINATIONS.map((dest) => {
                  const selected = destination === dest.id;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setDestination(dest.id)}
                      className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition ${
                        selected
                          ? 'bg-emerald-50/70 border-emerald-700'
                          : 'bg-slate-50/70 border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                          selected ? 'bg-emerald-950 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        {dest.icon}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">{dest.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{dest.desc}</p>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border mt-1 flex items-center justify-center text-[10px] ${
                          selected
                            ? 'border-emerald-700 bg-emerald-700 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {selected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Schedule a Pickup Window (for food/goods) */}
            {activeTab !== 'money' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h2 className="text-base font-extrabold text-slate-900">Schedule a Pickup Window</h2>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Date</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Tomorrow', 'Fri, Next', 'Sat, Next'].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setPickupDate(d)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition ${
                          pickupDate === d
                            ? 'bg-emerald-950 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Time Window</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['9:00 AM - 12:00 PM', '12:00 PM - 4:00 PM', '4:00 PM - 7:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeWindow(slot)}
                        className={`py-2 px-2 rounded-xl text-[10px] font-bold transition ${
                          timeWindow === slot
                            ? 'bg-emerald-950 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Safety & Quality Checklist */}
            <div className="bg-orange-50/70 rounded-2xl p-5 border border-orange-100">
              <p className="text-xs font-extrabold text-amber-900 mb-2.5">
                🛡️ Safety &amp; Quality Checklist
              </p>
              <ul className="space-y-1.5 text-[11px] text-amber-900/80">
                <li>✓ 100% of contributions go directly to verified local relief</li>
                <li>✓ Clean, safe, and properly packaged food or goods</li>
                <li>✓ Instant 501(c)(3) tax-deductible confirmation receipt</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {saving
                  ? 'Processing...'
                  : activeTab === 'money'
                  ? `Donate ${selectedAmount === 'Custom' ? 'Now' : `$${selectedAmount}`} Now →`
                  : 'Schedule Donation Pickup →'}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2.5">
                🧾 501(c)(3) tax-deductible receipt sent automatically
              </p>
            </div>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white mt-12 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© 2026 HungerNova Organization. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/home" className="hover:text-slate-700">Home</Link>
            <Link href="/campaigns" className="hover:text-slate-700">Campaigns</Link>
            <Link href="/profile" className="hover:text-slate-700">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Donate() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-6 text-center text-gray-500">Loading...</div>}>
      <DonateForm />
    </Suspense>
  );
}