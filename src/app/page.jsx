"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    router.replace('/home');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-700 mb-3">HungerNova</h1>
          <p className="text-gray-500">Welcome back. Ready to make an impact?</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="text-right">
            <button type="button" className="text-sm font-semibold text-green-700 hover:underline">Forgot Password?</button>
          </div>

          <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition">
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8">
          Don't have an account? <button className="text-green-700 font-bold hover:underline">Sign Up</button>
        </p>
      </div>
    </main>
  );
}