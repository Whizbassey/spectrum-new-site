"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  pricing: string;
  features: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state for create
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formPricing, setFormPricing] = useState("");
  const [formFeatures, setFormFeatures] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPricing, setEditPricing] = useState("");
  const [editFeatures, setEditFeatures] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete dialog state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function fetchServices() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("services")
      .select("id, name, description, image, pricing, features")
      .order("id", { ascending: false });
    if (error) setError(error.message);
    setServices(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  // Create
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const { error } = await supabase.from("services").insert({
      name: formName,
      description: formDescription,
      image: formImage,
      pricing: formPricing,
      features: formFeatures,
    });
    if (error) {
      setFormError(error.message);
      setFormLoading(false);
      return;
    }
    setFormName("");
    setFormDescription("");
    setFormImage("");
    setFormPricing("");
    setFormFeatures("");
    setShowModal(false);
    setFormLoading(false);
    fetchServices();
  }

  // Edit
  function openEditModal(service: Service) {
    setEditId(service.id);
    setEditName(service.name);
    setEditDescription(service.description);
    setEditImage(service.image);
    setEditPricing(service.pricing);
    setEditFeatures(service.features);
    setEditModal(true);
    setEditError("");
  }
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editId) return;
    setEditLoading(true);
    setEditError("");
    const { error } = await supabase.from("services").update({
      name: editName,
      description: editDescription,
      image: editImage,
      pricing: editPricing,
      features: editFeatures,
    }).eq("id", editId);
    if (error) {
      setEditError(error.message);
      setEditLoading(false);
      return;
    }
    setEditModal(false);
    setEditLoading(false);
    fetchServices();
  }

  // Delete
  async function handleDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError("");
    const { error } = await supabase.from("services").delete().eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleteLoading(false);
      return;
    }
    setDeleteId(null);
    setDeleteLoading(false);
    fetchServices();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-8 mt-32">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-6xl text-center">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-left">Services Admin</h1>
          </div>
          <button
            className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Create New Service
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : services.length === 0 ? (
          <div>No services found.</div>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Pricing</th>
                <th className="px-4 py-2">Features</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="bg-black/30">
                  <td className="px-4 py-2">
                    {service.image ? (
                      <img src={service.image} alt={service.name} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{service.name}</td>
                  <td className="px-4 py-2 line-clamp-2 max-w-xs">{service.description}</td>
                  <td className="px-4 py-2">{service.pricing}</td>
                  <td className="px-4 py-2">
                    {service.features.split(',').map((f, i) => (
                      <div key={i} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full mb-1 inline-block mr-1">{f.trim()}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="mr-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                      onClick={() => openEditModal(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                      onClick={() => setDeleteId(service.id)}
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

      {/* Modal for creating a new service */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Create New Service</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={formDescription}
                onChange={e => setFormDescription(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                className="border rounded px-3 py-2"
                value={formImage}
                onChange={e => setFormImage(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Pricing"
                className="border rounded px-3 py-2"
                value={formPricing}
                onChange={e => setFormPricing(e.target.value)}
              />
              <input
                type="text"
                placeholder="Features (comma separated)"
                className="border rounded px-3 py-2"
                value={formFeatures}
                onChange={e => setFormFeatures(e.target.value)}
                required
              />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button
                type="submit"
                className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? "Creating..." : "Create Service"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Modal for editing a service */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Edit Service</h2>
            <form onSubmit={handleEdit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                className="border rounded px-3 py-2"
                value={editImage}
                onChange={e => setEditImage(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Pricing"
                className="border rounded px-3 py-2"
                value={editPricing}
                onChange={e => setEditPricing(e.target.value)}
              />
              <input
                type="text"
                placeholder="Features (comma separated)"
                className="border rounded px-3 py-2"
                value={editFeatures}
                onChange={e => setEditFeatures(e.target.value)}
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
            <h2 className="text-xl font-bold mb-4">Delete Service?</h2>
            <p className="mb-6">Are you sure you want to delete this service? This action cannot be undone.</p>
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