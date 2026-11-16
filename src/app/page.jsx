"use client";
import { useState } from 'react';
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (isLogin) {
      await login({email,password});
      console.log("Logging in:", { email, password });
    } else {
      
      await signUp({name,email,password});
      console.log("Signing up:", { name, email, password });
    }
    
    router.replace('/home');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Optional: Clear fields when switching modes
    setPassword('');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-green-700 mb-3">HungerNova</h1>
          <p className="text-gray-500">
            {isLogin 
              ? "Welcome back. Ready to make an impact?" 
              : "Join the movement. Create your account."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Conditionally render Full Name only if signing up */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-700" 
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

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
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={!isLogin ? 6 : undefined}
            />
          </div>
          
          {/* Conditionally render Forgot Password only if logging in */}
          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm font-semibold text-green-700 hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition mt-2">
            {isLogin ? "Log In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Button */}
        <p className="text-center text-gray-500 mt-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={toggleAuthMode}
            className="text-green-700 font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </main>
  );
}