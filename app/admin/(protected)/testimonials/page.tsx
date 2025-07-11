"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  photo: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state for create
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formQuote, setFormQuote] = useState("");
  const [formPhoto, setFormPhoto] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editQuote, setEditQuote] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete dialog state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function fetchTestimonials() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, name, company, quote, photo")
      .order("id", { ascending: false });
    if (error) setError(error.message);
    setTestimonials(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Create
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const { error } = await supabase.from("testimonials").insert({
      name: formName,
      company: formCompany,
      quote: formQuote,
      photo: formPhoto,
    });
    if (error) {
      setFormError(error.message);
      setFormLoading(false);
      return;
    }
    setFormName("");
    setFormCompany("");
    setFormQuote("");
    setFormPhoto("");
    setShowModal(false);
    setFormLoading(false);
    fetchTestimonials();
  }

  // Edit
  function openEditModal(testimonial: Testimonial) {
    setEditId(testimonial.id);
    setEditName(testimonial.name);
    setEditCompany(testimonial.company);
    setEditQuote(testimonial.quote);
    setEditPhoto(testimonial.photo);
    setEditModal(true);
    setEditError("");
  }
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editId) return;
    setEditLoading(true);
    setEditError("");
    const { error } = await supabase.from("testimonials").update({
      name: editName,
      company: editCompany,
      quote: editQuote,
      photo: editPhoto,
    }).eq("id", editId);
    if (error) {
      setEditError(error.message);
      setEditLoading(false);
      return;
    }
    setEditModal(false);
    setEditLoading(false);
    fetchTestimonials();
  }

  // Delete
  async function handleDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError("");
    const { error } = await supabase.from("testimonials").delete().eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleteLoading(false);
      return;
    }
    setDeleteId(null);
    setDeleteLoading(false);
    fetchTestimonials();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-8 mt-32">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-6xl text-center">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-left">Testimonials Admin</h1>
          </div>
          <button
            className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Create New Testimonial
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : testimonials.length === 0 ? (
          <div>No testimonials found.</div>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Quote</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="bg-black/30">
                  <td className="px-4 py-2">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-16 h-16 object-cover rounded-full border border-white/10" />
                    ) : (
                      <span className="text-xs text-gray-400">No photo</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{t.name}</td>
                  <td className="px-4 py-2">{t.company}</td>
                  <td className="px-4 py-2 line-clamp-2 max-w-xs">{t.quote}</td>
                  <td className="px-4 py-2">
                    <button
                      className="mr-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                      onClick={() => openEditModal(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                      onClick={() => setDeleteId(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for creating a new testimonial */}
      <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-white text-black rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-xl text-black hover:text-orange-500"
              onClick={() => { setShowModal(false); setFormError(""); }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Add Testimonial</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company"
                className="border rounded px-3 py-2"
                value={formCompany}
                onChange={e => setFormCompany(e.target.value)}
                required
              />
              <textarea
                placeholder="Quote"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={formQuote}
                onChange={e => setFormQuote(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Photo URL"
                className="border rounded px-3 py-2"
                value={formPhoto}
                onChange={e => setFormPhoto(e.target.value)}
                required
              />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button
                type="submit"
                className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? "Adding..." : "Add Testimonial"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Modal for editing a testimonial */}
      <AnimatePresence>
      {editModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-white text-black rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-xl text-black hover:text-orange-500"
              onClick={() => { setEditModal(false); setEditError(""); }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Edit Testimonial</h2>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company"
                className="border rounded px-3 py-2"
                value={editCompany}
                onChange={e => setEditCompany(e.target.value)}
                required
              />
              <textarea
                placeholder="Quote"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={editQuote}
                onChange={e => setEditQuote(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Photo URL"
                className="border rounded px-3 py-2"
                value={editPhoto}
                onChange={e => setEditPhoto(e.target.value)}
                required
              />
              {editError && <div className="text-red-500 text-sm">{editError}</div>}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition-colors disabled:opacity-60"
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
      {deleteId !== null && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-white text-black rounded-xl shadow-2xl p-8 w-full max-w-sm text-center relative">
            <h2 className="text-xl font-bold mb-4">Delete Testimonial?</h2>
            <p className="mb-6">Are you sure you want to delete this testimonial? This action cannot be undone.</p>
            {deleteError && <div className="text-red-500 text-sm mb-2">{deleteError}</div>}
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-400 transition-colors disabled:opacity-60"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                onClick={() => { setDeleteId(null); setDeleteError(""); }}
                disabled={deleteLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
} 