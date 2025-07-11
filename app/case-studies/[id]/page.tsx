'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Head from 'next/head';
import Link from 'next/link';

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  image: string;
  description: string;
  results: string;
}

interface Testimonial {
  id: number;
  name: string;
  company: string;
  quote: string;
  photo?: string;
}

export default function CaseStudyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [related, setRelated] = useState<CaseStudy[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchStudy() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, company, industry, image, description, results')
        .eq('id', id)
        .single();
      if (error) setError(error.message);
      setStudy(data || null);
      setLoading(false);
      // Fetch related case studies
      if (data) {
        let relatedQuery = supabase
          .from('case_studies')
          .select('id, title, company, industry, image, description, results')
          .neq('id', data.id)
          .limit(3);
        if (data.industry) {
          relatedQuery = relatedQuery.or(`industry.eq.${data.industry}`);
        }
        if (data.company) {
          relatedQuery = relatedQuery.or(`company.eq.${data.company}`);
        }
        const { data: relatedData } = await relatedQuery;
        setRelated(relatedData || []);
        // Fetch testimonials for this company
        const { data: testimonialData } = await supabase
          .from('testimonials')
          .select('id, name, company, quote, photo')
          .eq('company', data.company);
        setTestimonials(testimonialData || []);
      }
    }
    if (id) fetchStudy();
  }, [id]);

  return (
    <>
      <Head>
        <title>{study ? study.title : 'Case Study'} | Spectrum AI</title>
        <meta name="description" content={study ? study.description : 'Case Study Detail'} />
      </Head>
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-violet-900/20 via-black to-orange-900/20 pointer-events-none" aria-hidden="true"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] pointer-events-none" aria-hidden="true"></div>
      <section className="container mx-auto px-6 pt-32 pb-24 min-h-screen">
        <div className="max-w-3xl w-full mx-auto bg-white/10 rounded-3xl shadow-2xl p-8 text-white">
          <Link href="/case-studies" className="text-orange-400 hover:underline text-sm mb-6 inline-block">← Back to Case Studies</Link>
          {loading ? (
            <div className="text-center text-lg py-20">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-20">{error}</div>
          ) : !study ? (
            <div className="text-center text-lg py-20">Case study not found.</div>
          ) : (
            <>
              {study.image ? (
                <img src={study.image} alt={study.title} className="w-full h-80 object-cover rounded-2xl mb-8" />
              ) : (
                <div className="w-full h-80 bg-black/30 rounded-2xl mb-8 flex items-center justify-center text-gray-400">No image</div>
              )}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-orange-500 text-black text-xs font-semibold tracking-wider py-2 px-4 rounded-full">
                  {study.industry}
                </span>
                <span className="bg-white/10 text-xs text-white px-3 py-1 rounded-full">
                  {study.company}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase font-inter">{study.title}</h1>
              <div className="prose prose-invert max-w-none text-lg leading-relaxed mb-6" style={{ whiteSpace: 'pre-line' }}>
                {study.description}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {study.results.split(',').map((result, i) => (
                  <span key={i} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full">{result.trim()}</span>
                ))}
              </div>
              {/* Testimonials */}
              {testimonials.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {testimonials.map(t => (
                      <div key={t.id} className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-center">
                        {t.photo ? (
                          <img src={t.photo} alt={t.name} className="w-16 h-16 object-cover rounded-full mb-3 border border-white/20" />
                        ) : (
                          <div className="w-16 h-16 bg-black/30 rounded-full mb-3 flex items-center justify-center text-gray-400">No photo</div>
                        )}
                        <blockquote className="italic text-lg mb-2 text-white/90">“{t.quote}”</blockquote>
                        <div className="font-semibold text-orange-300">{t.name}</div>
                        <div className="text-xs text-secondary">{t.company}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Related Case Studies */}
              {related.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Related Case Studies</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {related.map(r => (
                      <Link key={r.id} href={`/case-studies/${r.id}`} className="block bg-white/10 rounded-xl p-4 hover:bg-white/20 transition">
                        {r.image ? (
                          <img src={r.image} alt={r.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                        ) : (
                          <div className="w-full h-40 bg-black/30 rounded-lg mb-3 flex items-center justify-center text-gray-400">No image</div>
                        )}
                        <div className="font-semibold text-lg mb-1">{r.title}</div>
                        <div className="text-xs text-orange-300 mb-1">{r.company}</div>
                        <div className="text-xs text-secondary mb-1">{r.industry}</div>
                        <div className="flex flex-wrap gap-2 mb-1">
                          {r.results.split(',').map((result, i) => (
                            <span key={i} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full">{result.trim()}</span>
                          ))}
                        </div>
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