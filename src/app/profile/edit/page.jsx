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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const savedName = await getUserName();
      const savedEmail = await getUserEmail();
      setName(savedName || "");
      setEmail(savedEmail || "");
    };
    loadUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const res = await updateProfile({ name, email });
    setSaving(false);

    if (res?.error) {
      alert(res.error);
      return;
    }

    alert("Profile updated!");
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <Link href="/profile" className="text-gray-500 mb-4 inline-block hover:text-gray-700 transition">
          ← Back
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-700 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}