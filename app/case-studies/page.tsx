'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Head from 'next/head';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  industry: string;
  image: string;
  description: string;
  results: string;
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');

  useEffect(() => {
    async function fetchStudies() {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, company, industry, image, description, results')
        .order('id', { ascending: false });
      if (error) setError(error.message);
      setStudies(data || []);
      setLoading(false);
    }
    fetchStudies();
  }, []);

  // Get unique industries and companies
  const industries = Array.from(new Set(studies.map(s => s.industry).filter(Boolean)));
  const companies = Array.from(new Set(studies.map(s => s.company).filter(Boolean)));

  // Filter studies
  const filteredStudies = studies.filter(s =>
    (industryFilter === 'All' || s.industry === industryFilter) &&
    (companyFilter === 'All' || s.company === companyFilter)
  );

  return (
    <>
      <Head>
        <title>Case Studies | Spectrum AI</title>
        <meta name="description" content="See how we've helped businesses transform with AI automation." />
      </Head>
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-violet-900/20 via-black to-orange-900/20 pointer-events-none" aria-hidden="true"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] pointer-events-none" aria-hidden="true"></div>
      <main className="max-w-7xl md:px-10 mr-auto ml-auto pt-32 pr-6 pb-24 pl-6 relative z-10">
        <RevealOnScroll>
          <div className="opacity-0 animate-slide-up text-center mb-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
              Featured Cases
            </h1>
            <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
              Exploring the intersection of technology, creativity, and human experience through innovative digital solutions.
            </p>
            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-8"></div>
          </div>
        </RevealOnScroll>
        {/* Filter Buttons */}
        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div>
              <span className="text-sm text-white/70 mr-2">Industry:</span>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${industryFilter === 'All' ? 'bg-orange-500 text-black' : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                onClick={() => setIndustryFilter('All')}
              >
                All
              </button>
              {industries.map(ind => (
                <button
                  key={ind}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${industryFilter === ind ? 'bg-orange-500 text-black' : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                  onClick={() => setIndustryFilter(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
            <div>
              <span className="text-sm text-white/70 mr-2">Company:</span>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${companyFilter === 'All' ? 'bg-orange-500 text-black' : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                onClick={() => setCompanyFilter('All')}
              >
                All
              </button>
              {companies.map(comp => (
                <button
                  key={comp}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${companyFilter === comp ? 'bg-orange-500 text-black' : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
                  onClick={() => setCompanyFilter(comp)}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>
        {loading ? (
          <RevealOnScroll>
            <div className="text-center text-lg py-20">Loading...</div>
          </RevealOnScroll>
        ) : error ? (
          <RevealOnScroll>
            <div className="text-center text-red-500 py-20">{error}</div>
          </RevealOnScroll>
        ) : filteredStudies.length === 0 ? (
          <RevealOnScroll>
            <div className="text-center text-lg py-20">No case studies found.</div>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll>
            <div className="grid gap-8 md:gap-10 lg:grid-cols-2 xl:grid-cols-3">
              {filteredStudies.map(study => (
                <Link key={study.id} href={`/case-studies/${study.id}`} className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 hover:ring-white/20 transition-all duration-500 group cursor-pointer opacity-0 animate-slide-up">
                  {study.image ? (
                    <img src={study.image} alt={study.title} className="h-80 w-full transition duration-700 group-hover:scale-105 object-cover" />
                  ) : (
                    <div className="h-80 w-full bg-black/30 flex items-center justify-center text-gray-400">No image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-orange-500 text-black text-xs font-semibold tracking-wider py-2 px-4 rounded-full">
                      {study.industry}
                    </span>
                    <span className="bg-white/10 text-xs text-white px-3 py-1 rounded-full">
                      {study.company}
                    </span>
                  </div>
                  <div className="absolute bottom-8 left-6 right-6">
                    <h3 className="text-2xl font-light leading-tight mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {study.title}
                    </h3>
                    <p className="leading-relaxed text-sm font-light text-secondary mb-4 line-clamp-3">
                      {study.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {study.results.split(',').map((result, i) => (
                        <span key={i} className="bg-white/10 text-xs text-orange-200 px-2 py-1 rounded-full">{result.trim()}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealOnScroll>
        )}
      </main>
    </>
  );
} 