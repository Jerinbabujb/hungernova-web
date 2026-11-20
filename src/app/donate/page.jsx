"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserName, submitDonation } from './actions';


const DONATION_AMOUNTS = ['10', '25', '50', '100'];
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'your-super-secret-development-key');

export default function Donate() {
  const router = useRouter();
  const [donorName,setDonorName]= useState('');
  const [selectedAmount, setSelectedAmount] = useState('25');
  const searchParams = useSearchParams();
  const campaignName = searchParams.get('campaignName');
  useEffect(()=>{
    const getUser=async ()=>{
      const name = await getUserName();
      setDonorName(name);
    }
    getUser();
  },[])
  
  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {

     
      await submitDonation({
        donor_name: donorName,
        contact_number: formData.get('contact_number'),
        amount: selectedAmount === 'Custom' ? formData.get('custom_amount') : selectedAmount,
        notes: formData.get('notes')
      });
      alert("Thank you for your donation!");
      router.push('/home');
    } catch (error) {
      console.error(error);
      alert("Error processing donation.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto pb-24">
        <Link href="/home" className="text-gray-500 mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Make a Donation for {campaignName}</h1>
        <p className="text-gray-500 mb-8">Your contribution helps us distribute surplus food to those in need.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name<span className="text-red-500">*</span></label>
            <input type="text" name='donor_name' value={donorName} onChange={(e)=>setDonorName(e.target.value)}  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
            <input type="tel" name='contact_number' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700" required />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Amount <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {DONATION_AMOUNTS.map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedAmount(amount)}
                  className={`py-3 rounded-xl border font-bold transition ${selectedAmount === amount ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                  ${amount}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedAmount('Custom')}
                className={`py-3 rounded-xl border font-bold transition ${selectedAmount === 'Custom' ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                Custom
              </button>
            </div>
            {selectedAmount === 'Custom' && (
              <input type="number" name="custom_amount" min="1" placeholder="Enter amount" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700" required />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
            <textarea name='notes' className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 h-20"></textarea>
          </div>
          
          <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition">
            Donate Now
          </button>
        </form>
      </div>
    </main>
  );
}