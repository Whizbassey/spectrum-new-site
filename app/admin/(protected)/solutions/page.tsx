"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import CreatableSelect from 'react-select/creatable';

interface Solution {
  id: number;
  title: string;
  platforms: string[];
  industries: string[];
  impact: string;
  details: string;
  category: string;
}

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  // Modal state for create
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formPlatforms, setFormPlatforms] = useState<string[]>([]);
  const [formIndustries, setFormIndustries] = useState<string[]>([]);
  const [formImpact, setFormImpact] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPlatforms, setEditPlatforms] = useState<string[]>([]);
  const [editIndustries, setEditIndustries] = useState<string[]>([]);
  const [editImpact, setEditImpact] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete dialog state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function fetchSolutions() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("solutions")
      .select("id, title, platforms, industries, impact, details, category")
      .order("id", { ascending: false });
    if (error) setError(error.message);
    setSolutions(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchSolutions();
  }, []);

  // Create
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const { error } = await supabase.from("solutions").insert({
      title: formTitle,
      platforms: formPlatforms,
      industries: formIndustries,
      impact: formImpact,
      details: formDetails,
      category: formCategory,
    });
    if (error) {
      setFormError(error.message);
      setFormLoading(false);
      return;
    }
    setFormTitle("");
    setFormPlatforms([]);
    setFormIndustries([]);
    setFormImpact("");
    setFormDetails("");
    setFormCategory("");
    setShowModal(false);
    setFormLoading(false);
    fetchSolutions();
  }

  // Edit
  function openEditModal(solution: Solution) {
    setEditId(solution.id);
    setEditTitle(solution.title);
    setEditPlatforms(solution.platforms || []);
    setEditIndustries(solution.industries || []);
    setEditImpact(solution.impact);
    setEditDetails(solution.details);
    setEditCategory(solution.category);
    setEditModal(true);
    setEditError("");
  }
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editId) return;
    setEditLoading(true);
    setEditError("");
    const { error } = await supabase.from("solutions").update({
      title: editTitle,
      platforms: editPlatforms,
      industries: editIndustries,
      impact: editImpact,
      details: editDetails,
      category: editCategory,
    }).eq("id", editId);
    if (error) {
      setEditError(error.message);
      setEditLoading(false);
      return;
    }
    setEditModal(false);
    setEditLoading(false);
    fetchSolutions();
  }

  // Delete
  async function handleDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError("");
    const { error } = await supabase.from("solutions").delete().eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleteLoading(false);
      return;
    }
    setDeleteId(null);
    setDeleteLoading(false);
    fetchSolutions();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-8 mt-32">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-6xl text-center">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/admin" className="inline-flex items-center text-orange-400 hover:text-orange-600 font-semibold text-lg mr-4">
              <span className="mr-2">←</span> Back
            </Link>
            <h1 className="text-2xl font-bold text-left">Solutions Admin</h1>
          </div>
          <button
            className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Create New Solution
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : solutions.length === 0 ? (
          <div>No solutions found.</div>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Platforms</th>
                <th className="px-4 py-2">Industries</th>
                <th className="px-4 py-2">Impact</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {solutions.map((solution) => (
                <tr key={solution.id} className="bg-black/30">
                  <td className="px-4 py-2">{solution.title}</td>
                  <td className="px-4 py-2">
                    {solution.platforms.map((p, i) => (
                      <div key={i} className="bg-white/10 text-xs text-blue-200 px-2 py-1 rounded-full mb-1 inline-block mr-1">{p}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    {solution.industries.map((ind, i) => (
                      <div key={i} className="bg-white/10 text-xs text-green-200 px-2 py-1 rounded-full mb-1 inline-block mr-1">{ind}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2">{solution.impact}</td>
                  <td className="px-4 py-2 line-clamp-2 max-w-xs">{solution.details}</td>
                  <td className="px-4 py-2">{solution.category}</td>
                  <td className="px-4 py-2">
                    <button
                      className="mr-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                      onClick={() => openEditModal(solution)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                      onClick={() => setDeleteId(solution.id)}
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

      {/* Modal for creating a new solution */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Create New Solution</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border rounded px-3 py-2"
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                required
              />
              <CreatableSelect
                isMulti
                placeholder="Platforms (e.g. Zapier, OpenAI)"
                value={formPlatforms.map(p => ({ value: p, label: p }))}
                onChange={opts => setFormPlatforms(opts ? opts.map(o => o.value) : [])}
              />
              <CreatableSelect
                isMulti
                placeholder="Industries (e.g. E-commerce, SaaS)"
                value={formIndustries.map(i => ({ value: i, label: i }))}
                onChange={opts => setFormIndustries(opts ? opts.map(o => o.value) : [])}
              />
              <input
                type="text"
                placeholder="Impact (e.g. 70% reduction in response time)"
                className="border rounded px-3 py-2"
                value={formImpact}
                onChange={e => setFormImpact(e.target.value)}
                required
              />
              <textarea
                placeholder="Details (what does this solution do?)"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={formDetails}
                onChange={e => setFormDetails(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Category (e.g. Customer Service)"
                className="border rounded px-3 py-2"
                value={formCategory}
                onChange={e => setFormCategory(e.target.value)}
                required
              />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button
                type="submit"
                className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? "Creating..." : "Create Solution"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Modal for editing a solution */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Edit Solution</h2>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border rounded px-3 py-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                required
              />
              <CreatableSelect
                isMulti
                placeholder="Platforms (e.g. Zapier, OpenAI)"
                value={editPlatforms.map(p => ({ value: p, label: p }))}
                onChange={opts => setEditPlatforms(opts ? opts.map(o => o.value) : [])}
              />
              <CreatableSelect
                isMulti
                placeholder="Industries (e.g. E-commerce, SaaS)"
                value={editIndustries.map(i => ({ value: i, label: i }))}
                onChange={opts => setEditIndustries(opts ? opts.map(o => o.value) : [])}
              />
              <input
                type="text"
                placeholder="Impact (e.g. 70% reduction in response time)"
                className="border rounded px-3 py-2"
                value={editImpact}
                onChange={e => setEditImpact(e.target.value)}
                required
              />
              <textarea
                placeholder="Details (what does this solution do?)"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={editDetails}
                onChange={e => setEditDetails(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Category (e.g. Customer Service)"
                className="border rounded px-3 py-2"
                value={editCategory}
                onChange={e => setEditCategory(e.target.value)}
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
            <h2 className="text-xl font-bold mb-4">Delete Solution?</h2>
            <p className="mb-6">Are you sure you want to delete this solution? This action cannot be undone.</p>
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