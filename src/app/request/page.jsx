"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitFoodRequest } from './actions';

const FOOD_CATEGORIES = ['Produce', 'Prepared Meals', 'Pantry', 'Dairy & Meat'];

const FILTER_PILLS = [
  'Open Now',
  'Food Banks',
  'Free Hot Meals',
  'Community Fridges (24/7)',
  'Pantry Staples',
  'No ID Required',
  'Halal & Kosher',
  'Baby Food & Diapers',
];

const FOOD_HUBS = [
  {
    id: 1,
    name: 'Central Community Kitchen & Food Hub',
    status: 'OPEN NOW • TILL 7:30 PM',
    statusStyle: 'bg-emerald-50 text-emerald-700',
    badge: 'High Stock',
    badgeStyle: 'bg-amber-50 text-amber-800',
    distance: '0.4 miles away',
    address: 'Downtown Brooklyn (382 Schermerhorn St)',
    fullAddress: '382 Schermerhorn St, Brooklyn, NY 11217 • Open today until 7:30 PM',
    hours: 'Serving Hot Dinners Today: 4:00 PM – 7:30 PM',
    note1: 'No identification or paperwork required • Walk-ins welcome',
    note2: 'Rescued fresh shipment received 2 hours ago (Whole Foods & local bakeries)',
    tags: ['Prepared Hot Meals', 'Fresh Produce & Groceries', 'Baby Food & Formula'],
    cta: 'Request Food Assistance',
    rating: '4.9 (120+ reviews)',
    liveStock: 'Fresh hot beef & lentil soup, organic sourdough loaves, baby formula.',
    icon: '🍽️',
    pinLabel: 'Central Kitchen',
    pinPos: 'top-[42%] left-[24%]',
  },
  {
    id: 2,
    name: 'St. Jude Neighborhood Food Pantry & Fridge',
    status: 'OPEN 24/7 (OUTDOOR FRIDGE)',
    statusStyle: 'bg-emerald-50 text-emerald-700',
    badge: 'Indoor Pantry Tue/Thu',
    badgeStyle: 'bg-slate-100 text-slate-600',
    distance: '0.9 miles away',
    address: 'Crown Heights (742 Nostrand Ave)',
    fullAddress: '742 Nostrand Ave, Brooklyn, NY 11216 • Outdoor Freedge 24/7',
    hours: 'Outdoor Freedge Access: Always Unlocked • Free Take What You Need',
    note1: 'Self-serve refrigerated shelter box • Sanitized daily at 8:00 AM',
    note2: 'Restocked 3x daily by neighborhood volunteers',
    tags: ['Fresh Bread & Bakery', 'Pantry Staples (Rice, Beans, Oats)', 'Canned Soups & Fruits'],
    cta: 'Reserve Pickup / Pantry',
    rating: '4.8 (95+ reviews)',
    liveStock: 'Fresh bread loaves, boxed pasta, canned vegetables, seasonal apples.',
    icon: '🧊',
    pinLabel: 'St. Jude Freedge',
    pinPos: 'top-[68%] right-[12%]',
  },
  {
    id: 3,
    name: 'Hope Harbor Mobile Dinner Van',
    status: 'ARRIVING IN 35 MINS • 5:00 PM – 6:30 PM',
    statusStyle: 'bg-amber-50 text-amber-800',
    badge: 'Mobile Unit #4',
    badgeStyle: 'bg-slate-100 text-slate-600',
    distance: '1.2 miles away',
    address: 'Atlantic Ave Plaza (Under Barclays Overpass)',
    fullAddress: 'Atlantic Ave Plaza, Brooklyn, NY 11217 • 5:00 PM – 6:30 PM Today',
    hours: 'Hot Distribution Window: 5:00 PM – 6:30 PM Today',
    note1: 'Walk-up hot meals & takeaway grocery bags',
    note2: 'No ID required • Multilingual volunteers on site',
    tags: ['Free Hot Meals', 'Halal & Kosher', 'No ID Required'],
    cta: 'Request Food Assistance',
    rating: '4.9 (80+ reviews)',
    liveStock: 'Warm rice bowls, roasted chicken, vegetarian stew, bottled water.',
    icon: '🚐',
    pinLabel: 'Dinner Van (5PM)',
    pinPos: 'top-[54%] left-[40%]',
  },
];

export default function RequestFood() {
  const router = useRouter();

  // Directory UI state
  const [locationQuery, setLocationQuery] = useState('Brooklyn, NY 11201');
  const [radius, setRadius] = useState('Within 5 miles');
  const [activeFilter, setActiveFilter] = useState('Open Now');
  const [selectedHub, setSelectedHub] = useState(FOOD_HUBS[0]);

  // Request Modal state
  const [showModal, setShowModal] = useState(false);
  const [requestContext, setRequestContext] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openRequestModal = (contextLabel) => {
    setRequestContext(contextLabel);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert('Please select the type of food needed.');
      return;
    }

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const userNotes = formData.get('notes') || '';
    const combinedNotes = requestContext
      ? `[${requestContext}] ${userNotes}`.trim()
      : userNotes;

    try {
      await submitFoodRequest({
        name: formData.get('name'),
        contact_number: formData.get('contact_number'),
        type: selectedCategory,
        notes: combinedNotes,
      });
      alert('Request Submitted!');
      setShowModal(false);
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
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
            <Link href="/request" className="text-emerald-900 font-bold">Find Food</Link>
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

      {/* Search & Filter Header Bar */}
      <section className="bg-white border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-6 py-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Enter city, neighborhood, or ZIP code..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
              />
              {locationQuery && (
                <button
                  type="button"
                  onClick={() => setLocationQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setLocationQuery('Current Location')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shrink-0"
            >
              📍 Use My Location
            </button>

            <select
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-900 shrink-0"
            >
              <option>Within 2 miles</option>
              <option>Within 5 miles</option>
              <option>Within 10 miles</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-wrap gap-2">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setActiveFilter(pill)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    activeFilter === pill
                      ? 'bg-emerald-950 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pill === 'Open Now' ? '● Open Now' : pill}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveFilter('Open Now')}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* Main Split Directory & Map */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <p className="text-xs font-bold text-slate-700">
            ● 28 active food hubs verified {radius.toLowerCase()} of{' '}
            <span className="text-emerald-900">{locationQuery || 'you'}</span>
          </p>
          <p className="text-xs text-slate-500">
            SORT BY: <span className="font-bold text-slate-800">Nearest First (Distance)</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Hub Cards */}
          <div className="lg:col-span-6 space-y-4">
            {FOOD_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`bg-white rounded-2xl p-5 border transition cursor-pointer ${
                    isSelected
                      ? 'border-emerald-900 ring-1 ring-emerald-900 shadow-md'
                      : 'border-slate-100 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${hub.statusStyle}`}>
                        ● {hub.status}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${hub.badgeStyle}`}>
                        {hub.badge}
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center text-sm shrink-0">
                      {hub.icon}
                    </span>
                  </div>

                  <h2 className="text-base font-extrabold text-slate-900">{hub.name}</h2>
                  <p className="text-xs text-slate-500 mt-0.5 mb-3">
                    📍 {hub.distance} • {hub.address}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-[11px] text-slate-600 mb-3">
                    <p className="font-bold text-slate-800">🕒 {hub.hours}</p>
                    <p>🛡️ {hub.note1}</p>
                    <p>📦 {hub.note2}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openRequestModal(hub.name);
                      }}
                      className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 rounded-xl transition"
                    >
                      {hub.cta}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHub(hub);
                      }}
                      className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition"
                    >
                      Directions
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Map Preview + Selected Hub Overlay */}
          <div className="lg:col-span-6 lg:sticky lg:top-20">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-sky-50 h-[560px] shadow-sm">
              {/* Map Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:22px_22px] opacity-35" />

              {/* Top Legend */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl px-3.5 py-2 shadow-sm border border-slate-100 flex items-center gap-3 text-[11px] font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-700" /> Open Now
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" /> Mobile / Scheduled
                </span>
              </div>

              {/* Map Pins */}
              {FOOD_HUBS.map((hub) => {
                const active = selectedHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setSelectedHub(hub)}
                    className={`absolute ${hub.pinPos} px-3 py-1.5 rounded-xl text-xs font-extrabold shadow-md transition ${
                      active
                        ? 'bg-emerald-950 text-white scale-105 z-20'
                        : 'bg-white text-slate-800 hover:bg-slate-50 z-10'
                    }`}
                  >
                    {hub.icon} {hub.pinLabel}
                  </button>
                );
              })}

              {/* Bottom Floating Selected Hub Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-lg border border-slate-100">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                        Verified Rescue Hub
                      </span>
                      <span className="text-[11px] font-bold text-amber-600">★ {selectedHub.rating}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{selectedHub.name}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-2">📍 {selectedHub.fullAddress}</p>
                <p className="text-xs text-slate-700 mb-4">
                  <span className="font-bold">Live Stock:</span> {selectedHub.liveStock}
                </p>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => openRequestModal(selectedHub.name)}
                    className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold py-2.5 rounded-xl transition"
                  >
                    Request Food From This Hub →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Delivery Banner */}
        <div className="mt-10 bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
              🏠
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Can&apos;t travel or need home delivery?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our volunteer network provides discrete, dignified doorstep food drops for elderly,
                disabled, or isolated neighbors.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openRequestModal('Home Delivery Request')}
              className="bg-emerald-950 hover:bg-emerald-900 text-white text-xs font-bold px-5 py-3 rounded-xl transition"
            >
              Request Home Delivery
            </button>
            <a
              href="tel:211"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-5 py-3 rounded-xl transition"
            >
              Call Emergency Hotline (211)
            </a>
          </div>
        </div>
      </main>

      {/* Request Food Modal (Wired to submitFoodRequest) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Direct Assistance Request
                </p>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Request Food</h2>
                {requestContext && (
                  <p className="text-xs text-slate-500 mt-1">For: {requestContext}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Organization / Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Downtown Shelter or Your Name"
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
                  placeholder="(555) 123-4567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Type of Food Needed <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {FOOD_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 rounded-full border text-xs font-bold transition ${
                        selectedCategory === category
                          ? 'bg-emerald-950 border-emerald-950 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any dietary needs, household size, or delivery instructions?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Food Request →'}
              </button>
            </form>
          </div>
        </div>
      )}

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