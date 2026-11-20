"use client";
import Link from 'next/link';
import { MOCK_USER } from '@/lib/data';
import { useEffect, useState } from 'react';
import { getDonatedAmount, getUserEmail, getUserName } from '../donate/actions';

const MENU_ITEMS = [
  { id: '1', title: 'Edit Profile', icon: '👤', href: '/profile/edit' },
  { id: '2', title: 'My Donations', icon: '❤️', href: '/mydonations' },
  { id: '3', title: 'Notifications', icon: '🔔', href: '/notifications' },
  { id: '4', title: 'Settings', icon: '⚙️', href: '/settings' },
];


export default function Profile() {
  const [userName,setUserName] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [totalAmount,setTotalAmount] = useState('');

  useEffect(()=>{
    const getName = async()=>{
      const savedName = await getUserName();
      const savedEmail = await getUserEmail();
      const savedAmount = await getDonatedAmount();
      setUserName(savedName);
      setUserEmail(savedEmail);
      setTotalAmount(savedAmount);
    }
    getName();
  },[])
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <Link href="/home" className="text-gray-500 mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Profile</h1>

        <div className="flex flex-col items-center mb-8">
          <img src={MOCK_USER.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-green-700 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">{userName}</h2>
          <p className="text-gray-500">{userEmail}</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
          <h3 className="text-center font-bold text-gray-900 mb-4">Your Impact</h3>
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <p className="text-2xl font-extrabold text-green-700">{MOCK_USER.impact.mealsRescued}</p>
              <p className="text-xs text-gray-500 font-semibold">Meals</p>
            </div>
            <div className="w-px h-10 bg-gray-200 mx-2"></div>
            <div className="flex-1">
              <p className="text-2xl font-extrabold text-green-700">${totalAmount}</p>
              <p className="text-xs text-gray-500 font-semibold">Donated</p>
            </div>
            <div className="w-px h-10 bg-gray-200 mx-2"></div>
            <div className="flex-1">
              <p className="text-2xl font-extrabold text-green-700">{MOCK_USER.impact.campaigns}</p>
              <p className="text-xs text-gray-500 font-semibold">Campaigns</p>
            </div>
          </div>
        </div>

        {/* Menu */}
<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
  {MENU_ITEMS.map((item) => (
    <Link
      href={item.href}
      key={item.id}
      className="w-full flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 transition text-left"
    >
      <span className="text-xl mr-4">{item.icon}</span>
      <span className="flex-1 font-semibold text-gray-700">{item.title}</span>
      <span className="text-gray-300">❯</span>
    </Link>
  ))}
</div>

        <Link href="/" className="w-full flex justify-center items-center bg-red-50 text-red-600 font-bold py-4 rounded-xl border border-red-200 hover:bg-red-100 transition">
          Log Out
        </Link>
      </div>
    </main>
  );
}