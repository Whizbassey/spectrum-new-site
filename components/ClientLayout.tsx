"use client";
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlassBackdrop from '@/components/GlassBackdrop';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {/* Spline 3D background for all pages */}
      <div className="fixed inset-0 z-0">
        <iframe
          src="https://my.spline.design/thresholddarkambientui-v0gkZCfi6zXm69kE0wccy70f/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Aurora Background"
        ></iframe>
      </div>
      {/* Universal Black Glass Backdrop except on homepage hero */}
      <GlassBackdrop />
      <div className="relative z-20 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatePresence initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <script src="/random-hover.js"></script>
    </>
  );
} 