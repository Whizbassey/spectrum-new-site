"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Spectrum AI offer?",
    answer: "We provide AI-powered automation, data analytics, chatbot solutions, and custom AI integrations for businesses of all sizes.",
  },
  {
    question: "How do I get started?",
    answer: "Contact us for a free consultation. We'll analyze your needs and propose a tailored AI solution.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We follow industry best practices for data security and privacy in all our solutions.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Yes! Our team specializes in seamless integrations with your current tech stack.",
  },
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto py-6 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={faq.question} className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
            <button
              className="w-full flex items-center justify-between px-6 py-5 text-lg font-medium text-left focus:outline-none"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
              aria-controls={`faq-${idx}`}
            >
              {faq.question}
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
            </button>
            <div
              id={`faq-${idx}`}
              className={`px-6 pb-5 text-secondary transition-all duration-300 ${open === idx ? 'block' : 'hidden'}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 