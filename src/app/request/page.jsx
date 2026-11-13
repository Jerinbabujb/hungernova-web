"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitFoodRequest } from './actions';

const FOOD_CATEGORIES = ['Produce', 'Prepared Meals', 'Pantry', 'Dairy & Meat'];

export default function RequestFood() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
   const formData = new FormData(e.currentTarget);
   try{
    await submitFoodRequest({
      name:formData.get('name'),
      contact_number:formData.get('conatct_number'),
      type:selectedCategory,
      notes:formData.get('notes')
    });
    alert("Request Submitted!");
    router.push('/home');
   }
   catch(error){
    console.error(error);
   }
    
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto pb-24">
        <Link href="/home" className="text-gray-500 mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Request Food</h1>
        <p className="text-gray-500 mb-8">Request surplus food for your community or organization.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Organization / Name <span className="text-red-500">*</span></label>
            <input type="text" name='name' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700" placeholder="e.g. Downtown Shelter" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
            <input type="tel" name='conatct_number' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700" placeholder="(555) 123-4567" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Food Needed <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-2">
              {FOOD_CATEGORIES.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                    selectedCategory === category ? 'bg-green-50 border-green-700 text-green-700' : 'bg-white border-gray-300 text-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
            <textarea name='notes' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700 h-24" placeholder="Any specific requirements?"></textarea>
          </div>
          
          <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition">
            Submit Request
          </button>
        </form>
      </div>
    </main>
  );
}