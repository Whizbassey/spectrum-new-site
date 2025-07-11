"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  social: string;
}

export default function AdminTeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state for create
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formPhoto, setFormPhoto] = useState("");
  const [formSocial, setFormSocial] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editPhoto, setEditPhoto] = useState("");
  const [editSocial, setEditSocial] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Delete dialog state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function fetchMembers() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("team_members")
      .select("id, name, role, bio, photo, social")
      .order("id", { ascending: false });
    if (error) setError(error.message);
    setMembers(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  // Create
  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const { error } = await supabase.from("team_members").insert({
      name: formName,
      role: formRole,
      bio: formBio,
      photo: formPhoto,
      social: formSocial,
    });
    if (error) {
      setFormError(error.message);
      setFormLoading(false);
      return;
    }
    setFormName("");
    setFormRole("");
    setFormBio("");
    setFormPhoto("");
    setFormSocial("");
    setShowModal(false);
    setFormLoading(false);
    fetchMembers();
  }

  // Edit
  function openEditModal(member: TeamMember) {
    setEditId(member.id);
    setEditName(member.name);
    setEditRole(member.role);
    setEditBio(member.bio);
    setEditPhoto(member.photo);
    setEditSocial(member.social);
    setEditModal(true);
    setEditError("");
  }
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editId) return;
    setEditLoading(true);
    setEditError("");
    const { error } = await supabase.from("team_members").update({
      name: editName,
      role: editRole,
      bio: editBio,
      photo: editPhoto,
      social: editSocial,
    }).eq("id", editId);
    if (error) {
      setEditError(error.message);
      setEditLoading(false);
      return;
    }
    setEditModal(false);
    setEditLoading(false);
    fetchMembers();
  }

  // Delete
  async function handleDelete() {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError("");
    const { error } = await supabase.from("team_members").delete().eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleteLoading(false);
      return;
    }
    setDeleteId(null);
    setDeleteLoading(false);
    fetchMembers();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-8 mt-32">
      <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-6xl text-center">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/admin" className="inline-flex items-center text-orange-400 hover:text-orange-600 font-semibold text-lg mr-4">
              <span className="mr-2">←</span> Back
            </Link>
            <h1 className="text-2xl font-bold text-left">Team Members Admin</h1>
          </div>
          <button
            className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
            onClick={() => setShowModal(true)}
          >
            Create New Team Member
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-400">{error}</div>
        ) : members.length === 0 ? (
          <div>No team members found.</div>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Photo</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Bio</th>
                <th className="px-4 py-2">Social</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="bg-black/30">
                  <td className="px-4 py-2">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-16 h-16 object-cover rounded-full border border-white/10" />
                    ) : (
                      <span className="text-xs text-gray-400">No photo</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{member.name}</td>
                  <td className="px-4 py-2">{member.role}</td>
                  <td className="px-4 py-2 line-clamp-2 max-w-xs">{member.bio}</td>
                  <td className="px-4 py-2">
                    {member.social ? (
                      member.social.split(',').map((s, i) => (
                        <div key={i} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full mb-1 inline-block mr-1">{s.trim()}</div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="mr-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                      onClick={() => openEditModal(member)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                      onClick={() => setDeleteId(member.id)}
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

      {/* Modal for creating a new team member */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Add Team Member</h2>
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
                placeholder="Role/Title"
                className="border rounded px-3 py-2"
                value={formRole}
                onChange={e => setFormRole(e.target.value)}
                required
              />
              <textarea
                placeholder="Bio"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={formBio}
                onChange={e => setFormBio(e.target.value)}
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
              <input
                type="text"
                placeholder="Social Links (comma separated)"
                className="border rounded px-3 py-2"
                value={formSocial}
                onChange={e => setFormSocial(e.target.value)}
              />
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <button
                type="submit"
                className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:opacity-60"
                disabled={formLoading}
              >
                {formLoading ? "Adding..." : "Add Member"}
              </button>
            </form>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Modal for editing a team member */}
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
            <h2 className="text-xl font-bold mb-4 text-center">Edit Team Member</h2>
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
                placeholder="Role/Title"
                className="border rounded px-3 py-2"
                value={editRole}
                onChange={e => setEditRole(e.target.value)}
                required
              />
              <textarea
                placeholder="Bio"
                className="border rounded px-3 py-2 min-h-[80px]"
                value={editBio}
                onChange={e => setEditBio(e.target.value)}
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
              <input
                type="text"
                placeholder="Social Links (comma separated)"
                className="border rounded px-3 py-2"
                value={editSocial}
                onChange={e => setEditSocial(e.target.value)}
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
            <h2 className="text-xl font-bold mb-4">Delete Team Member?</h2>
            <p className="mb-6">Are you sure you want to delete this team member? This action cannot be undone.</p>
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