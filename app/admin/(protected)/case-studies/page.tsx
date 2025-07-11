"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import CreatableSelect from "react-select/creatable";
import ImageUploader from "@/components/ui/ImageUploader";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  image: string;
  cover_image?: string;
  description: string;
  results: string;
  slug?: string;
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state for create
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formResults, setFormResults] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<any>(null);
  const [industries, setIndustries] = useState<any[]>([]);

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editResults, setEditResults] = useState("");
  const [editCoverImage, setEditCoverImage] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSelectedIndustry, setEditSelectedIndustry] = useState<any>(null);

  // Delete dialog state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [industryError, setIndustryError] = useState("");
  const [industrySuccess, setIndustrySuccess] = useState("");
  const [industryDeleteMsg, setIndustryDeleteMsg] = useState("");

  async function fetchStudies() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("case_studies")
      .select("id, title, company, industry, image, cover_image, description, results, slug")
      .order("id", { ascending: false });
    if (error) setError(error.message);
    setStudies(data || []);
    setLoading(false);
  }

  async function fetchIndustries() {
    const { data, error } = await supabase
      .from('case_studies')
      .select('industry')
      .neq('industry', null);
    if (!error && data) {
      const unique = Array.from(new Set(data.map((i: any) => i.industry).filter(Boolean)));
      setIndustries(unique.map((ind) => ({ label: ind, value: ind })));
    }
  }

  useEffect(() => {
    fetchStudies();
    fetchIndustries();
  }, []);

  // Create
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const slug = slugify(formTitle);
    const industryToUse = selectedIndustry?.value || "";
    if (!industryToUse) {
      setFormError("Please select or create an industry.");
      setFormLoading(false);
      return;
    }
    const { error } = await supabase.from("case_studies").insert({
      title: formTitle,
      company: formCompany,
      industry: industryToUse,
      cover_image: formCoverImage,
      description: formDescription,
      results: formResults,
      slug,
    });
    if (error) {
      setFormError(error.message);
      setFormLoading(false);
      return;
    }
    setFormTitle("");
    setFormCompany("");
    setFormDescription("");
    setFormResults("");
    setFormCoverImage("");
    setSelectedIndustry(null);
    setShowModal(false);
    setFormLoading(false);
    fetchStudies();
  }

  // Edit
  function openEditModal(study: CaseStudy) {
    setEditId(study.id);
    setEditTitle(study.title);
    setEditCompany(study.company);
    setEditDescription(study.description);
    setEditResults(study.results);
    setEditCoverImage(study.cover_image || "");
    setEditSelectedIndustry(study.industry ? { label: study.industry, value: study.industry } : null);
    setEditModal(true);
    setEditError("");
  }
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editId) return;
    setEditLoading(true);
    setEditError("");
    const slug = slugify(editTitle);
    const industryToUse = editSelectedIndustry?.value || "";
    if (!industryToUse) {
      setEditError("Please select or create an industry.");
      setEditLoading(false);
      return;
    }
    const { error } = await supabase.from("case_studies").update({
      title: editTitle,
      company: editCompany,
      industry: industryToUse,
      cover_image: editCoverImage,
      description: editDescription,
      results: editResults,
      slug,
    }).eq("id", editId);
    if (error) {
      setEditError(error.message);
      setEditLoading(false);
      return;
    }
    setEditModal(false);
    setEditLoading(false);
    fetchStudies();
  }

  // Delete
  async function handleDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError("");
    const { error } = await supabase.from("case_studies").delete().eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleteLoading(false);
      return;
    }
    setDeleteId(null);
    setDeleteLoading(false);
    fetchStudies();
  }

  // CreatableSelect handlers
  const handleIndustryChange = (newValue: any) => {
    setSelectedIndustry(newValue);
  };
  const handleEditIndustryChange = async (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      const { error } = await supabase.from('industries').insert({ name: newValue.value });
      if (!error) {
        setIndustries((prev: any) => [...prev, newValue]);
        setEditSelectedIndustry(newValue);
      }
    } else {
      setEditSelectedIndustry(newValue);
    }
  };

  async function deleteIndustry(industryToDelete: string) {
    if (!window.confirm(`Delete industry "${industryToDelete}" from all case studies?`)) return;
    const { error } = await supabase
      .from('case_studies')
      .update({ industry: null })
      .eq('industry', industryToDelete);
    if (!error) {
      await fetchIndustries();
      setIndustryDeleteMsg('Industry deleted!');
      setTimeout(() => setIndustryDeleteMsg(''), 2000);
    } else {
      setIndustryDeleteMsg('Error deleting industry: ' + error.message);
      setTimeout(() => setIndustryDeleteMsg(''), 4000);
    }
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto mt-8 mb-4">
        <Link href="/admin" className="inline-flex items-center text-orange-400 hover:text-orange-600 font-semibold text-lg">
          <span className="mr-2">←</span> Back to Admin
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-8 mt-32">
        <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-6xl text-center">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-left">Case Studies Admin</h1>
            </div>
            <button
              className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
              onClick={async () => { await fetchIndustries(); setShowModal(true); }}
            >
              Create New Case Study
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : studies.length === 0 ? (
            <div>No case studies found.</div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-4 py-2">Cover Image</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Industry</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Results</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studies.map((study) => (
                  <tr key={study.id} className="bg-black/30">
                    <td className="px-4 py-2">
                      {study.cover_image ? (
                        <img src={study.cover_image} alt={study.title} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{study.title}</td>
                    <td className="px-4 py-2">{study.company}</td>
                    <td className="px-4 py-2">{study.industry}</td>
                    <td className="px-4 py-2 line-clamp-2 max-w-xs">{study.description}</td>
                    <td className="px-4 py-2">
                      {study.results.split(',').map((r, i) => (
                        <div key={i} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full mb-1 inline-block mr-1">{r.trim()}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="mr-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                        onClick={() => openEditModal(study)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                        onClick={() => setDeleteId(study.id)}
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

        <div className="mb-6 w-full max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Industries</h2>
          {industryDeleteMsg && <div className="mb-2 text-sm text-green-500">{industryDeleteMsg}</div>}
          <ul className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <li key={ind.value} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <span>{ind.label}</span>
                <button
                  className="text-red-400 hover:text-red-600 text-xs font-bold"
                  onClick={() => deleteIndustry(ind.value)}
                >
                  Delete
                </button>
              </li>
            ))}
            {industries.length === 0 && <li className="text-gray-400">No industries yet.</li>}
          </ul>
        </div>

        {/* Modal for creating a new case study */}
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
              <h2 className="text-xl font-bold mb-4 text-center">Create New Case Study</h2>
              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="border rounded px-3 py-2"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
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
                <label className="text-left">Industry</label>
                <CreatableSelect
                  isClearable
                  onChange={handleIndustryChange}
                  options={industries}
                  value={selectedIndustry}
                  placeholder="Select or create industry..."
                />
                <ImageUploader
                  bucket="case-study-images"
                  label="Cover Image"
                  onUpload={setFormCoverImage}
                  initialUrl={formCoverImage}
                />
                <textarea
                  placeholder="Description"
                  className="border rounded px-3 py-2 min-h-[80px]"
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Results (comma separated)"
                  className="border rounded px-3 py-2"
                  value={formResults}
                  onChange={e => setFormResults(e.target.value)}
                  required
                />
                {industryError && <div className="text-red-500 text-xs mt-1">{industryError}</div>}
                {industrySuccess && <div className="text-green-500 text-xs mt-1">{industrySuccess}</div>}
                {formError && <div className="text-red-500 text-sm">{formError}</div>}
                <button
                  type="submit"
                  className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:opacity-60"
                  disabled={formLoading}
                >
                  {formLoading ? "Creating..." : "Create Case Study"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Modal for editing a case study */}
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
              <h2 className="text-xl font-bold mb-4 text-center">Edit Case Study</h2>
              <form onSubmit={handleEdit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="border rounded px-3 py-2"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
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
                <label className="text-left">Industry</label>
                <CreatableSelect
                  isClearable
                  onChange={handleEditIndustryChange}
                  options={industries}
                  value={editSelectedIndustry}
                  placeholder="Select or create industry..."
                />
                <ImageUploader
                  bucket="case-study-images"
                  label="Cover Image"
                  onUpload={setEditCoverImage}
                  initialUrl={editCoverImage}
                />
                <textarea
                  placeholder="Description"
                  className="border rounded px-3 py-2 min-h-[80px]"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Results (comma separated)"
                  className="border rounded px-3 py-2"
                  value={editResults}
                  onChange={e => setEditResults(e.target.value)}
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
              <h2 className="text-xl font-bold mb-4">Delete Case Study?</h2>
              <p className="mb-6">Are you sure you want to delete this case study? This action cannot be undone.</p>
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
    </>
  );
} 