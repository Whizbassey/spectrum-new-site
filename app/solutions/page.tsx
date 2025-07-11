import { AISolutionsShowcase } from '@/components/ui/ai-solutions-showcase';
import { Badge } from '@/components/ui/button';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export default function SolutionsPage() {
  return (
    <section className="container mx-auto px-6 pt-32 pb-24 mt-20">
      <RevealOnScroll>
        <div className="max-w-3xl w-full text-center mb-20 mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter mb-6 uppercase font-inter">
            AI Solutions Gallery
          </h1>
          <p className="md:text-xl max-w-2xl leading-relaxed text-lg text-secondary mx-auto">
            Explore our library of no-code and low-code AI automation solutions for SMBs. Filter by category, search for specific use cases, and discover how AI can transform every area of your business.
          </p>
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mx-auto mt-8"></div>
        </div>
      </RevealOnScroll>
      <div className="glass-card bg-black/60 border border-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-8">
        <RevealOnScroll>
          <AISolutionsShowcase />
        </RevealOnScroll>
      </div>
    </section>
  );
} 