'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Head from 'next/head';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: number;
  title: string;
  category?: string;
  featured_image?: string;
  created_at: string;
  content?: string;
  slug?: string;
  author?: string;
  tags?: string;
}

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, category, featured_image, created_at, content, slug, author, tags')
        .eq('slug', slug)
        .single();
      if (error) setError(error.message);
      setPost(data || null);
      setLoading(false);
      // Fetch related posts
      if (data) {
        let relatedQuery = supabase
          .from('blog_posts')
          .select('id, title, category, featured_image, created_at, slug, author, tags')
          .neq('id', data.id)
          .limit(3);
        if (data.category) {
          relatedQuery = relatedQuery.or(`category.eq.${data.category}`);
        }
        if (data.tags) {
          const tagsArr = data.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
          if (tagsArr.length > 0) {
            // Supabase doesn't support array overlap, so we use ilike for any tag
            relatedQuery = relatedQuery.or(tagsArr.map((tag: string) => `tags.ilike.%${tag}%`).join(','));
          }
        }
        const { data: relatedData } = await relatedQuery;
        setRelated(relatedData || []);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  // SEO meta tags
  const metaTitle = post ? `${post.title} | Spectrum AI` : 'Blog Post | Spectrum AI';
  const metaDescription = post?.content ? post.content.slice(0, 150) : 'Read this blog post on Spectrum AI.';
  const metaImage = post?.featured_image || '/default-og-image.png';

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-violet-900/20 via-black to-orange-900/20 pointer-events-none" aria-hidden="true"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] pointer-events-none" aria-hidden="true"></div>
      <section className="container mx-auto px-6 pt-32 pb-24 min-h-screen">
        <div className="max-w-3xl w-full mx-auto bg-white/10 rounded-3xl shadow-2xl p-8 text-white">
          <Link href="/blog" className="text-orange-400 hover:underline text-sm mb-6 inline-block">← Back to Blog</Link>
          {loading ? (
            <div className="text-center text-lg py-20">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-20">{error}</div>
          ) : !post ? (
            <div className="text-center text-lg py-20">Post not found.</div>
          ) : (
            <>
              {post.featured_image ? (
                <img src={post.featured_image} alt={post.title} className="w-full h-80 object-cover rounded-2xl mb-8" />
              ) : (
                <div className="w-full h-80 bg-black/30 rounded-2xl mb-8 flex items-center justify-center text-gray-400">No image</div>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {post.category && (
                  <span className="bg-orange-500 text-black text-xs font-semibold tracking-wider py-2 px-4 rounded-full">
                    {post.category}
                  </span>
                )}
                <span className="flex items-center gap-2 text-secondary text-xs">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase font-inter">{post.title}</h1>
              {post.author && (
                <div className="text-orange-300 text-sm mb-4">By {post.author}</div>
              )}
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.split(',').map(tag => (
                    <span key={tag.trim()} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full">{tag.trim()}</span>
                  ))}
                </div>
              )}
              <div className="prose prose-invert max-w-none text-lg leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                <ReactMarkdown>{post.content || ''}</ReactMarkdown>
              </div>
              {/* Related Posts */}
              {related.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {related.map(rp => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition">
                        {rp.featured_image ? (
                          <img src={rp.featured_image} alt={rp.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                        ) : (
                          <div className="w-full h-40 bg-black/30 rounded-lg mb-3 flex items-center justify-center text-gray-400">No image</div>
                        )}
                        <div className="font-semibold text-lg mb-1">{rp.title}</div>
                        {rp.author && <div className="text-xs text-orange-300 mb-1">By {rp.author}</div>}
                        {rp.tags && (
                          <div className="flex flex-wrap gap-2 mb-1">
                            {rp.tags.split(',').map(tag => (
                              <span key={tag.trim()} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full">{tag.trim()}</span>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-secondary">{new Date(rp.created_at).toLocaleDateString()}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
} 