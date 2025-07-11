"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import ImageUploader from "@/components/ui/ImageUploader";
import CreatableSelect from 'react-select/creatable';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

// Define BlogPost type
interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  content?: string;
  category?: string;
  featured_image?: string;
  cover_image?: string;
  slug?: string;
}

// Utility to generate slug from title
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export default function AdminBlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state for create
  const [showModal, setShowModal] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryError, setCategoryError] = useState("");
  const [categorySuccess, setCategorySuccess] = useState("");

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editCoverImage, setEditCoverImage] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSelectedCategory, setEditSelectedCategory] = useState<any>(null);

  // Delete dialog state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [categoryDeleteMsg, setCategoryDeleteMsg] = useState("");

  async function fetchPosts() {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, created_at, category, featured_image, cover_image, slug")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    setPosts(data || []);
    setLoading(false);
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .neq('category', null);
    if (!error && data) {
      const unique = Array.from(new Set(data.map((c: any) => c.category).filter(Boolean)));
      setCategories(unique.map((cat) => ({ label: cat, value: cat })));
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  // Create
  async function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    const slug = slugify(formTitle);
    const categoryToUse = selectedCategory?.value || "";
    if (!categoryToUse) {
      setFormError("Please select or create a category.");
      setFormLoading(false);
      return;
    }
    const { error } = await supabase.from("blog_posts").insert({
      title: formTitle,
      content: formContent,
      category: categoryToUse,
      cover_image: formCoverImage,
      slug,
    });
    if (error) {
      setFormError(error.message);
      setFormLoading(false);
      return;
    }
    setFormTitle("");
    setFormContent("");
    setFormCoverImage("");
    setSelectedCategory(null);
    setShowModal(false);
    setFormLoading(false);
    fetchPosts();
  }

  // Edit
  function openEditModal(post: BlogPost) {
    setEditId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content || "");
    setEditCoverImage(post.cover_image || "");
    setEditSelectedCategory(post.category ? { label: post.category, value: post.category } : null);
    setEditModal(true);
    setEditError("");
  }
  async function handleEditPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editId) return;
    setEditLoading(true);
    setEditError("");
    const slug = slugify(editTitle);
    const categoryToUse = editSelectedCategory?.value || "";
    if (!categoryToUse) {
      setEditError("Please select or create a category.");
      setEditLoading(false);
      return;
    }
    const { error } = await supabase.from("blog_posts").update({
      title: editTitle,
      content: editContent,
      category: categoryToUse,
      cover_image: editCoverImage,
      slug,
    }).eq("id", editId);
    if (error) {
      setEditError(error.message);
      setEditLoading(false);
      return;
    }
    setEditModal(false);
    setEditLoading(false);
    fetchPosts();
  }

  // Delete
  async function handleDeletePost() {
    if (!deleteId) return;
    setDeleteLoading(true);
    setDeleteError("");
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteId);
    if (error) {
      setDeleteError(error.message);
      setDeleteLoading(false);
      return;
    }
    setDeleteId(null);
    setDeleteLoading(false);
    fetchPosts();
  }

  // CreatableSelect handlers
  const handleCategoryChange = (newValue: any) => {
    setSelectedCategory(newValue);
  };
  const handleEditCategoryChange = async (newValue: any, actionMeta: any) => {
    if (actionMeta.action === 'create-option') {
      const { error } = await supabase.from('categories').insert({ name: newValue.value });
      if (!error) {
        setCategories((prev: any) => [...prev, newValue]);
        setEditSelectedCategory(newValue);
      }
    } else {
      setEditSelectedCategory(newValue);
    }
  };

  async function deleteCategory(categoryToDelete: string) {
    if (!window.confirm(`Delete category "${categoryToDelete}" from all blog posts?`)) return;
    const { error } = await supabase
      .from('blog_posts')
      .update({ category: null })
      .eq('category', categoryToDelete);
    if (!error) {
      await fetchCategories();
      setCategoryDeleteMsg('Category deleted!');
      setTimeout(() => setCategoryDeleteMsg(''), 2000);
    } else {
      setCategoryDeleteMsg('Error deleting category: ' + error.message);
      setTimeout(() => setCategoryDeleteMsg(''), 4000);
    }
  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto mt-8 mb-4">
        <Link href="/admin" className="inline-flex items-center text-orange-400 hover:text-orange-600 font-semibold text-lg">
          <span className="mr-2">←</span> Back to Admin
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-8 mt-32">
        <div className="bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-5xl text-center">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href="/admin" className="inline-flex items-center text-orange-400 hover:text-orange-600 font-semibold text-lg mr-4">
                <span className="mr-2">←</span> Back
              </Link>
              <h1 className="text-2xl font-bold text-left">Blog Posts Admin</h1>
            </div>
            <button
              className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors"
              onClick={async () => { await fetchCategories(); setShowModal(true); }}
            >
              Create New Post
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : posts.length === 0 ? (
            <div>No blog posts found.</div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-4 py-2">Cover Image</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Created At</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="bg-black/30">
                    <td className="px-4 py-2">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt="Cover" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{post.title}</td>
                    <td className="px-4 py-2">{post.category || <span className="text-xs text-gray-400">None</span>}</td>
                    <td className="px-4 py-2">{new Date(post.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        className="mr-2 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
                        onClick={async () => {
                          const { data } = await supabase.from("blog_posts").select("id, title, content, created_at, category, cover_image, slug").eq("id", post.id).single();
                          if (data) openEditModal(data);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-400"
                        onClick={() => setDeleteId(post.id)}
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

        <div className="mb-6 w-full max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          {categoryDeleteMsg && <div className="mb-2 text-sm text-green-500">{categoryDeleteMsg}</div>}
          <ul className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <li key={cat.value} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                <span>{cat.label}</span>
                <button
                  className="text-red-400 hover:text-red-600 text-xs font-bold"
                  onClick={() => deleteCategory(cat.value)}
                >
                  Delete
                </button>
              </li>
            ))}
            {categories.length === 0 && <li className="text-gray-400">No categories yet.</li>}
          </ul>
        </div>

        {/* Modal for creating a new post */}
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
              <h2 className="text-xl font-bold mb-4 text-center">Create New Blog Post</h2>
              <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="border rounded px-3 py-2"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  required
                />
                <label className="text-left">Category</label>
                <CreatableSelect
                  isClearable
                  onChange={handleCategoryChange}
                  options={categories}
                  value={selectedCategory}
                  placeholder="Select or create category..."
                />
                {categoryError && <div className="text-red-500 text-xs mt-1">{categoryError}</div>}
                {categorySuccess && <div className="text-green-500 text-xs mt-1">{categorySuccess}</div>}
                <ImageUploader
                  bucket="blog-images"
                  label="Cover Image"
                  onUpload={setFormCoverImage}
                  initialUrl={formCoverImage}
                />
                <textarea
                  placeholder="Content"
                  className="border rounded px-3 py-2 min-h-[120px]"
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  required
                />
                {formError && <div className="text-red-500 text-sm">{formError}</div>}
                <button
                  type="submit"
                  className="bg-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:opacity-60"
                  disabled={formLoading}
                >
                  {formLoading ? "Creating..." : "Create Post"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Modal for editing a post */}
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
              <h2 className="text-xl font-bold mb-4 text-center">Edit Blog Post</h2>
              <form onSubmit={handleEditPost} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="border rounded px-3 py-2"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  required
                />
                <label className="text-left">Category</label>
                <CreatableSelect
                  isClearable
                  onChange={handleEditCategoryChange}
                  options={categories}
                  value={editSelectedCategory}
                  placeholder="Select or create category..."
                />
                <ImageUploader
                  bucket="blog-images"
                  label="Cover Image"
                  onUpload={setEditCoverImage}
                  initialUrl={editCoverImage}
                />
                <textarea
                  placeholder="Content"
                  className="border rounded px-3 py-2 min-h-[120px]"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
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
              <h2 className="text-xl font-bold mb-4">Delete Blog Post?</h2>
              <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
              {deleteError && <div className="text-red-500 text-sm mb-2">{deleteError}</div>}
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-400 transition-colors disabled:opacity-60"
                  onClick={handleDeletePost}
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