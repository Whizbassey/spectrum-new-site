'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Head from 'next/head'
import Link from 'next/link'
import { ExternalLink, Calendar } from 'lucide-react'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Badge } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

interface BlogPost {
  id: number;
  title: string;
  category?: string;
  featured_image?: string;
  created_at: string;
  content?: string;
  slug?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, category, featured_image, created_at, content, slug')
        .order('created_at', { ascending: false });
      if (error) setError(error.message);
      setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const fadeEls = document.querySelectorAll('.animate-fade-in');
    fadeEls.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.2}s`;
    });
    const slideEls = document.querySelectorAll('.animate-slide-up');
    slideEls.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.6 + i * 0.2}s`;
    });
  }, [posts, selectedCategory]);

  // Get unique categories from posts
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));

  // Filter posts by selected category
  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      {/* Gradient overlays */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-violet-900/20 via-black to-orange-900/20 pointer-events-none" aria-hidden="true"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] pointer-events-none" aria-hidden="true"></div>
      <RevealOnScroll>
        <section className="container mx-auto px-6 pt-32 pb-24">
          <div className="max-w-3xl w-full text-center mb-12 mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
              Blog
            </h1>
            <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
              Insights, updates, and thought leadership on AI, automation, and digital transformation.
            </p>
            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-8"></div>
          </div>
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 opacity-0 animate-fade-in">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${selectedCategory === 'All' ? 'bg-orange-500 text-black' : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
              onClick={() => setSelectedCategory('All')}
            >
              All Posts
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${selectedCategory === category ? 'bg-orange-500 text-black' : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                onClick={() => setSelectedCategory(category!)}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Blog Grid */}
          {loading ? (
            <div className="text-center text-lg py-20">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-20">{error}</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-lg py-20">No blog posts found.</div>
          ) : (
            <div className="grid gap-8 md:gap-10 lg:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 hover:ring-white/20 transition-all duration-500 group cursor-pointer opacity-0 animate-slide-up ${idx === 0 ? 'lg:col-span-2 xl:col-span-2' : ''}`}
                >
                  {post.featured_image ? (
                    <img src={post.featured_image} alt={post.title} className={`h-80 ${idx === 0 ? 'lg:h-96' : ''} w-full transition duration-700 group-hover:scale-105 object-cover`} />
                  ) : (
                    <div className="h-80 w-full bg-black/30 flex items-center justify-center text-gray-400">No image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  {/* Floating badge */}
                  <div className={`absolute top-6 left-6 flex items-center gap-2`}>
                    {post.category && (
                      <span className="bg-orange-500 text-black text-xs font-semibold tracking-wider py-2 px-4 rounded-full">
                        {post.category}
                      </span>
                    )}
                    {idx === 0 && (
                      <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="absolute bottom-8 left-6 right-6">
                    <h3 className={`text-2xl ${idx === 0 ? 'lg:text-4xl text-3xl' : ''} font-light leading-tight mb-3`} style={{ fontFamily: 'Playfair Display, serif' }}>
                      {post.title}
                    </h3>
                    <div className={`leading-relaxed ${idx === 0 ? 'max-w-md font-thin' : 'text-sm font-light'} text-secondary mb-4 line-clamp-3`}>
                      <ReactMarkdown>{post.content ? post.content.slice(0, 120) + (post.content.length > 120 ? '...' : '') : ''}</ReactMarkdown>
                    </div>
                    {/* Status/Year for featured */}
                    {idx === 0 && post.created_at && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-secondary">Live Post</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-secondary" />
                          <span className="text-secondary">{new Date(post.created_at).getFullYear()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </RevealOnScroll>
    </>
  )
} 