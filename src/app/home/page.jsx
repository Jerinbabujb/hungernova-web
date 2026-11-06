import Link from 'next/link';
import { MOCK_USER } from '@/lib/data';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-500 text-sm">Good Morning,</p>
            <h1 className="text-3xl font-extrabold text-gray-900">{MOCK_USER.name.split(' ')[0]} 👋</h1>
          </div>
          <Link href="/profile">
            <img src={MOCK_USER.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-green-700" />
          </Link>
        </div>

        {/* Impact Card */}
        <div className="bg-green-700 rounded-2xl p-6 text-white shadow-lg shadow-green-900/20 mb-8">
          <p className="text-green-100 text-sm font-semibold text-center mb-4">Community Impact This Week</p>
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <p className="text-3xl font-extrabold">4,250</p>
              <p className="text-green-200 text-sm">Meals Rescued</p>
            </div>
            <div className="w-px h-10 bg-green-500 mx-4"></div>
            <div className="flex-1">
              <p className="text-3xl font-extrabold">18</p>
              <p className="text-green-200 text-sm">Active Drives</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">What would you like to do?</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/request" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3 text-2xl">🍽️</div>
            <h3 className="font-bold text-gray-900">Request Food</h3>
            <p className="text-xs text-gray-500">For your community</p>
          </Link>
          <Link href="/campaigns" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-700 mb-3 text-2xl">🌿</div>
            <h3 className="font-bold text-gray-900">Campaigns</h3>
            <p className="text-xs text-gray-500">Support active drives</p>
          </Link>
          <Link href="/donate" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-3 text-2xl">❤️</div>
            <h3 className="font-bold text-gray-900">Donate</h3>
            <p className="text-xs text-gray-500">Fund a rescue</p>
          </Link>
          <Link href="/volunteer" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3 text-2xl">👥</div>
            <h3 className="font-bold text-gray-900">Volunteer</h3>
            <p className="text-xs text-gray-500">Join a local run</p>
          </Link>
        </div>
      </div>
    </main>
  );
}