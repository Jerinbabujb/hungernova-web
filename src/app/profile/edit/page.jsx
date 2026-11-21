"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserName, getUserEmail } from "../../donate/actions";
import { updateProfile } from "./actions";

export default function ProfileEdit() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const [savedName, savedEmail] = await Promise.all([
          getUserName(),
          getUserEmail(),
        ]);
        setName(savedName || "");
        setEmail(savedEmail || "");
      } catch (error) {
        console.error("Failed to load user details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await updateProfile({ name, email });
      if (res?.error) {
        alert(res.error);
        return;
      }

      alert("Profile updated!");
      router.push("/profile");
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile. Please try again.");
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
            <Link href="/donate" className="hover:text-slate-900 transition">Donate</Link>
            <Link href="/campaigns" className="hover:text-slate-900 transition">Campaigns</Link>
            <Link href="/volunteer" className="hover:text-slate-900 transition">Volunteer</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/profile" className="text-sm font-bold text-emerald-900">
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

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2">
              Account Settings • Personal Information
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Edit Profile</h1>
          </div>
          <Link
            href="/profile"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 transition"
          >
            ← Back to Profile
          </Link>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
          >
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Personal Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep your name and email up to date for donation receipts and volunteer coordination.
              </p>
            </div>

            {loading ? (
              <div className="py-8 text-center text-sm text-slate-400 font-medium">
                Loading your details...
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-900 transition"
                    required
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm py-3.5 rounded-xl shadow-sm transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes →"}
                  </button>
                  <Link
                    href="/profile"
                    className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm text-center transition"
                  >
                    Cancel
                  </Link>
                </div>
              </>
            )}
          </form>

          {/* Right Privacy Sidebar */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
                🔒 Privacy First
              </p>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Your contact information is strictly used for donation receipts, pickup alerts, and
                account security. We never sell or share your personal records.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <p className="text-xs font-extrabold text-slate-900 mb-1">Need to change your password?</p>
              <p className="text-[11px] text-slate-500 mb-3">
                Manage your password and security preferences in Settings.
              </p>
              <Link
                href="/settings"
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                Go to Settings →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white mt-12 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© 2026 HungerNova Organization. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/home" className="hover:text-slate-700">Home</Link>
            <Link href="/profile" className="hover:text-slate-700">Profile</Link>
            <Link href="/settings" className="hover:text-slate-700">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}