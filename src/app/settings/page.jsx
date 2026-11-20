"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { changePassword, logoutUser } from "./actions";

export default function Settings() {
  const router = useRouter();

  // Notification toggles (UI state)
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [campaignUpdates, setCampaignUpdates] = useState(true);

  // Password form state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    setSaving(true);
    const res = await changePassword({ currentPassword, newPassword });
    setSaving(false);

    if (res?.error) {
      alert(res.error);
      return;
    }

    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setShowPasswordForm(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto pb-12">
        <Link href="/profile" className="text-gray-500 mb-4 inline-block hover:text-gray-700 transition">
          ← Back
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Settings</h1>

        {/* Preferences */}
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Preferences
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div>
              <p className="font-semibold text-gray-800">Email Receipts</p>
              <p className="text-xs text-gray-400">Receive confirmation for donations</p>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                emailAlerts ? "bg-green-700" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  emailAlerts ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-semibold text-gray-800">Campaign Updates</p>
              <p className="text-xs text-gray-400">News on food drives near you</p>
            </div>
            <button
              type="button"
              onClick={() => setCampaignUpdates(!campaignUpdates)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                campaignUpdates ? "bg-green-700" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  campaignUpdates ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Security */}
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
          Security
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <button
            type="button"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition text-left"
          >
            <div className="flex items-center">
              <span className="text-xl mr-4">🔒</span>
              <span className="font-semibold text-gray-700">Change Password</span>
            </div>
            <span className="text-gray-300">{showPasswordForm ? "▼" : "❯"}</span>
          </button>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="px-6 pb-6 pt-2 space-y-4 border-t border-gray-50">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-green-700 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-700 text-white font-bold py-3 rounded-xl shadow-sm hover:bg-green-800 transition disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>

        {/* Log Out */}
        <button
          onClick={handleLogout}
          className="w-full flex justify-center items-center bg-red-50 text-red-600 font-bold py-4 rounded-xl border border-red-200 hover:bg-red-100 transition"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}