"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p className="mb-8 text-lg">Welcome! What would you like to manage?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/admin/blog-posts" className="bg-black/40 border border-white/10 rounded-lg p-6 hover:bg-orange-500/20 transition-colors font-semibold">Blog Posts</Link>
          <Link href="/admin/case-studies" className="bg-black/40 border border-white/10 rounded-lg p-6 hover:bg-orange-500/20 transition-colors font-semibold">Case Studies</Link>
          <Link href="/admin/solutions" className="bg-black/40 border border-white/10 rounded-lg p-6 hover:bg-orange-500/20 transition-colors font-semibold">Solutions</Link>
          <Link href="/admin/services" className="bg-black/40 border border-white/10 rounded-lg p-6 hover:bg-orange-500/20 transition-colors font-semibold">Services</Link>
          <Link href="/admin/team-members" className="bg-black/40 border border-white/10 rounded-lg p-6 hover:bg-orange-500/20 transition-colors font-semibold">Team Members</Link>
          <Link href="/admin/testimonials" className="bg-black/40 border border-white/10 rounded-lg p-6 hover:bg-orange-500/20 transition-colors font-semibold">Testimonials</Link>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
} 