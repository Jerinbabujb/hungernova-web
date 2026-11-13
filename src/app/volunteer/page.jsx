"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitVolunteer } from './actions';

const VOLUNTEER_ROLES = ['Delivery Driver', 'Food Sorter', 'Kitchen Prep', 'Event Staff'];

export default function Volunteer() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please select a volunteer role.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    
    try {
      await submitVolunteer({
        name: formData.get('name'),
        contact_number: formData.get('contact_number'),
        role: selectedRole,
        notes: formData.get('notes')
      });
      alert("Thank you for signing up to volunteer!");
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert("Error submitting volunteer form.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto pb-24">
        <Link href="/home" className="text-gray-500 mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Volunteer With Us</h1>
        <p className="text-gray-500 mb-8">Join the HungerNova team and help deliver surplus food across the community.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
            <input type="text" name='name' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
            <input type="tel" name='contact_number' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700" required />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Role <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {VOLUNTEER_ROLES.map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${selectedRole === role ? 'bg-green-50 border-green-700 text-green-700' : 'bg-white border-gray-300 text-gray-600'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Availability & Notes</label>
            <textarea name='notes' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 h-24" placeholder="What days/times are you typically free?"></textarea>
          </div>
          
          <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition">
            Sign Up to Volunteer
          </button>
        </form>
      </div>
    </main>
  );
}