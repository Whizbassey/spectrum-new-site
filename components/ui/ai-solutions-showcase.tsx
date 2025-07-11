'use client'
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MessageSquare, BarChart3, Users, Shield, Cpu, Globe } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Badge } from '@/components/ui/button'

const categories = [
  'All',
  'Customer Service',
  'Sales & Marketing',
  'Operations',
  'HR',
  'Finance',
  'Industry-Specific',
  'Content & Creative',
];

const solutions = [
  // Customer Service & Support
  {
    id: 1,
    icon: <MessageSquare className="w-7 h-7 text-cyan-400" />,
    title: 'AI-Powered Customer Support Hub',
    platforms: ['Zapier', 'OpenAI', 'Zendesk', 'Intercom'],
    impact: '70% reduction in response time, 24/7 support availability',
    industries: ['E-commerce', 'SaaS', 'Professional Services'],
    category: 'Customer Service',
    details: 'Automated ticket routing, sentiment analysis, and instant response generation',
  },
  {
    id: 2,
    icon: <MessageSquare className="w-7 h-7 text-cyan-400" />,
    title: 'Intelligent Chat Assistant',
    platforms: ['Chatbot.com', 'GPT-4', 'CRM Integration'],
    impact: '300% increase in lead capture, 85% of queries resolved without human intervention',
    industries: ['Real Estate', 'Healthcare', 'Legal Services'],
    category: 'Customer Service',
    details: 'Qualify leads, answer FAQs, schedule appointments, collect customer data',
  },
  {
    id: 3,
    icon: <MessageSquare className="w-7 h-7 text-cyan-400" />,
    title: 'Voice-to-Text Customer Feedback Analyzer',
    platforms: ['Assembly AI', 'Airtable', 'Slack'],
    impact: '90% faster insight extraction, automated follow-up workflows',
    industries: ['Retail', 'Hospitality', 'Consulting'],
    category: 'Customer Service',
    details: 'Transcribe and analyze customer calls, extract insights, trigger follow-up actions',
  },
  // Sales & Marketing
  {
    id: 4,
    icon: <BarChart3 className="w-7 h-7 text-cyan-400" />,
    title: 'Smart Lead Scoring & Nurturing',
    platforms: ['HubSpot', 'Zapier', 'OpenAI'],
    impact: '45% increase in conversion rates, 60% reduction in manual lead qualification',
    industries: ['B2B Services', 'Technology', 'Manufacturing'],
    category: 'Sales & Marketing',
    details: 'AI analyzes lead behavior, scores prospects, personalizes email sequences',
  },
  {
    id: 5,
    icon: <BarChart3 className="w-7 h-7 text-cyan-400" />,
    title: 'Dynamic Content Personalization Engine',
    platforms: ['Webflow', 'Memberstack', 'GPT-4'],
    impact: '40% increase in engagement, 25% boost in sales conversions',
    industries: ['E-commerce', 'Media', 'Education'],
    category: 'Sales & Marketing',
    details: 'Personalizes website content, product recommendations, and email campaigns',
  },
  {
    id: 6,
    icon: <BarChart3 className="w-7 h-7 text-cyan-400" />,
    title: 'Social Media Content Autopilot',
    platforms: ['Buffer', 'DALL-E', 'ChatGPT', 'Canva API'],
    impact: '80% time savings, 150% increase in social engagement',
    industries: ['Agencies', 'Restaurants', 'Fitness', 'Beauty'],
    category: 'Sales & Marketing',
    details: 'Generates posts, creates images, schedules content, analyzes performance',
  },
  {
    id: 7,
    icon: <BarChart3 className="w-7 h-7 text-cyan-400" />,
    title: 'AI Email Marketing Optimizer',
    platforms: ['Mailchimp', 'Zapier', 'OpenAI'],
    impact: '35% higher open rates, 50% improvement in click-through rates',
    industries: ['E-commerce', 'Non-profits', 'Professional Services'],
    category: 'Sales & Marketing',
    details: 'A/B tests subject lines, optimizes send times, personalizes content',
  },
  // Operations & Workflow
  {
    id: 8,
    icon: <Cpu className="w-7 h-7 text-cyan-400" />,
    title: 'Document Processing & Data Extraction',
    platforms: ['Zapier', 'Google Cloud Vision', 'Airtable'],
    impact: '90% reduction in manual data entry, 99.5% accuracy rate',
    industries: ['Accounting', 'Legal', 'Healthcare', 'Real Estate'],
    category: 'Operations',
    details: 'Extracts data from invoices, contracts, forms; populates databases automatically',
  },
  {
    id: 9,
    icon: <Cpu className="w-7 h-7 text-cyan-400" />,
    title: 'Smart Inventory Management',
    platforms: ['Google Sheets', 'AppScript', 'Demand Forecasting AI'],
    impact: '30% reduction in carrying costs, 95% reduction in stockouts',
    industries: ['Retail', 'Restaurants', 'Manufacturing'],
    category: 'Operations',
    details: 'Predicts demand, automates reordering, optimizes stock levels',
  },
  {
    id: 10,
    icon: <Cpu className="w-7 h-7 text-cyan-400" />,
    title: 'Intelligent Invoice Processing',
    platforms: ['QuickBooks', 'Receipt-AI', 'Zapier'],
    impact: '85% faster expense processing, 100% compliance tracking',
    industries: ['Professional Services', 'Contractors', 'Small Retail'],
    category: 'Operations',
    details: 'Scans receipts, categorizes expenses, generates reports, detects anomalies',
  },
  {
    id: 11,
    icon: <Cpu className="w-7 h-7 text-cyan-400" />,
    title: 'Automated Quality Control',
    platforms: ['Roboflow', 'Zapier', 'Slack'],
    impact: '95% defect detection accuracy, 70% reduction in manual inspection time',
    industries: ['Manufacturing', 'Food Production', 'Packaging'],
    category: 'Operations',
    details: 'AI vision inspects products, flags defects, triggers alerts',
  },
  // Human Resources
  {
    id: 12,
    icon: <Users className="w-7 h-7 text-cyan-400" />,
    title: 'AI Resume Screening & Ranking',
    platforms: ['JazzHR', 'OpenAI', 'Google Sheets'],
    impact: '80% time savings in initial screening, 60% improvement in candidate quality',
    industries: ['All sectors with hiring needs'],
    category: 'HR',
    details: 'Screens resumes, ranks candidates, schedules interviews automatically',
  },
  {
    id: 13,
    icon: <Users className="w-7 h-7 text-cyan-400" />,
    title: 'Employee Sentiment Analysis',
    platforms: ['Microsoft Forms', 'Azure AI', 'Power BI'],
    impact: '40% improvement in retention, early warning system for HR issues',
    industries: ['Corporate', 'Healthcare', 'Education'],
    category: 'HR',
    details: 'Analyzes feedback, detects mood trends, predicts turnover risk',
  },
  {
    id: 14,
    icon: <Users className="w-7 h-7 text-cyan-400" />,
    title: 'Smart Onboarding Assistant',
    platforms: ['Notion', 'Zapier', 'ChatGPT'],
    impact: '50% faster onboarding, 95% new hire satisfaction score',
    industries: ['Technology', 'Professional Services', 'Remote Teams'],
    category: 'HR',
    details: 'Personalizes onboarding, answers new hire questions, tracks progress',
  },
  // Finance & Analytics
  {
    id: 15,
    icon: <Shield className="w-7 h-7 text-cyan-400" />,
    title: 'Intelligent Expense Categorization',
    platforms: ['Xero', 'Receipt Bank', 'Custom AI Model'],
    impact: '95% categorization accuracy, 75% reduction in bookkeeping time',
    industries: ['Small Business', 'Freelancers', 'Consultants'],
    category: 'Finance',
    details: 'Auto-categorizes transactions, flags unusual spending, generates insights',
  },
  {
    id: 16,
    icon: <Shield className="w-7 h-7 text-cyan-400" />,
    title: 'Cash Flow Prediction Engine',
    platforms: ['QuickBooks', 'Google Sheets', 'Prophet AI'],
    impact: '85% prediction accuracy, prevents cash flow crises',
    industries: ['Seasonal Businesses', 'Retail', 'Services'],
    category: 'Finance',
    details: 'Predicts cash flow, identifies seasonal patterns, alerts to potential shortfalls',
  },
  {
    id: 17,
    icon: <Shield className="w-7 h-7 text-cyan-400" />,
    title: 'Smart Financial Report Generator',
    platforms: ['Power BI', 'OpenAI', 'Excel'],
    impact: '90% faster report creation, actionable insights for decision-making',
    industries: ['All sectors requiring financial reporting'],
    category: 'Finance',
    details: 'Generates narrative reports, explains trends, suggests actions',
  },
  // Industry-Specific Solutions
  {
    id: 18,
    icon: <Globe className="w-7 h-7 text-cyan-400" />,
    title: 'Restaurant Revenue Optimizer',
    platforms: ['Toast POS', 'Weather API', 'Demand Forecasting'],
    impact: '20% increase in revenue, 15% reduction in food waste',
    industries: ['Restaurants', 'Cafes', 'Food Trucks'],
    category: 'Industry-Specific',
    details: 'Predicts busy periods, optimizes staffing, adjusts pricing dynamically',
  },
  {
    id: 19,
    icon: <Globe className="w-7 h-7 text-cyan-400" />,
    title: 'Healthcare Appointment Intelligence',
    platforms: ['Calendly', 'Twilio', 'Patient Prediction AI'],
    impact: '40% reduction in no-shows, 25% increase in appointment efficiency',
    industries: ['Healthcare', 'Dental', 'Wellness'],
    category: 'Industry-Specific',
    details: 'Predicts no-shows, sends smart reminders, optimizes scheduling',
  },
  {
    id: 20,
    icon: <Globe className="w-7 h-7 text-cyan-400" />,
    title: 'Real Estate Lead Qualifier',
    platforms: ['Zillow API', 'ChatGPT', 'CRM Integration'],
    impact: '60% increase in qualified leads, 80% faster response time',
    industries: ['Real Estate', 'Property Management'],
    category: 'Industry-Specific',
    details: 'Qualifies property inquiries, schedules viewings, matches preferences',
  },
  {
    id: 21,
    icon: <Globe className="w-7 h-7 text-cyan-400" />,
    title: 'E-commerce Price Optimization',
    platforms: ['Shopify', 'Competitor API', 'Dynamic Pricing AI'],
    impact: '15% increase in profit margins, competitive positioning maintenance',
    industries: ['E-commerce', 'Retail', 'Marketplace Sellers'],
    category: 'Industry-Specific',
    details: 'Monitors competitor prices, adjusts pricing automatically, maximizes margins',
  },
  // Content & Creative
  {
    id: 22,
    icon: <Zap className="w-7 h-7 text-cyan-400" />,
    title: 'AI Content Marketing Suite',
    platforms: ['WordPress', 'Jasper AI', 'Canva', 'Social Schedulers'],
    impact: '300% increase in content output, 50% improvement in engagement',
    industries: ['Digital Agencies', 'Small Businesses', 'Consultants'],
    category: 'Content & Creative',
    details: 'Creates blog posts, social content, graphics, and schedules distribution',
  },
  {
    id: 23,
    icon: <Zap className="w-7 h-7 text-cyan-400" />,
    title: 'Product Description Generator',
    platforms: ['Shopify', 'GPT-4', 'Image Recognition'],
    impact: '90% time savings, 25% improvement in search rankings',
    industries: ['E-commerce', 'Catalog Companies', 'Manufacturers'],
    category: 'Content & Creative',
    details: 'Analyzes product images, generates SEO-optimized descriptions',
  },
  {
    id: 24,
    icon: <Zap className="w-7 h-7 text-cyan-400" />,
    title: 'Video Content Automation',
    platforms: ['Loom', 'Assembly AI', 'Canva'],
    impact: '80% faster content repurposing, 200% increase in video reach',
    industries: ['Education', 'Training', 'Marketing Agencies'],
    category: 'Content & Creative',
    details: 'Transcribes videos, creates summaries, generates social clips',
  },
  // Add a sample for technical specs (optional, not shown in card for now)
];

const platformBadgeColors: Record<string, string> = {
  'OpenAI': 'blue',
  'Zapier': 'orange',
  'GPT-4': 'violet',
  'DALL-E': 'pink',
  'Canva': 'emerald',
  'Canva API': 'emerald',
  'Slack': 'blue',
  'Google Sheets': 'emerald',
  'Notion': 'violet',
  'Power BI': 'yellow',
  'Mailchimp': 'pink',
  'HubSpot': 'orange',
  'Webflow': 'blue',
  'Memberstack': 'violet',
  'Buffer': 'blue',
  'ChatGPT': 'violet',
  'AppScript': 'emerald',
  'QuickBooks': 'emerald',
  'Receipt-AI': 'pink',
  'Roboflow': 'yellow',
  'JazzHR': 'orange',
  'Microsoft Forms': 'blue',
  'Azure AI': 'blue',
  'Twilio': 'pink',
  'Shopify': 'emerald',
  'WordPress': 'blue',
  'Jasper AI': 'violet',
  'Loom': 'blue',
  'Assembly AI': 'yellow',
  'Toast POS': 'orange',
  'Weather API': 'blue',
  'CRM Integration': 'violet',
  'Demand Forecasting': 'emerald',
  'Demand Forecasting AI': 'emerald',
  'Airtable': 'pink',
  'Zendesk': 'blue',
  'Intercom': 'violet',
  'Google Cloud Vision': 'yellow',
  'Receipt Bank': 'pink',
  'Excel': 'emerald',
  'Patient Prediction AI': 'blue',
  'Zillow API': 'blue',
  'Competitor API': 'orange',
  'Dynamic Pricing AI': 'emerald',
  'Social Schedulers': 'pink',
};

const categoryHoverColors: Record<string, string> = {
  'All': 'hover:bg-emerald-500',
  'Customer Service': 'hover:bg-blue-500',
  'Sales & Marketing': 'hover:bg-orange-500',
  'Operations': 'hover:bg-emerald-500',
  'HR': 'hover:bg-violet-500',
  'Finance': 'hover:bg-yellow-400 hover:text-black',
  'Industry-Specific': 'hover:bg-pink-500',
  'Content & Creative': 'hover:bg-violet-500',
};

export function AISolutionsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return solutions.filter(sol =>
      (selectedCategory === 'All' || sol.category === selectedCategory) &&
      (sol.title.toLowerCase().includes(search.toLowerCase()) ||
        sol.industries.some(ind => ind.toLowerCase().includes(search.toLowerCase())) ||
        sol.platforms.some(p => p.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [selectedCategory, search]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all border border-white/10 backdrop-blur-md text-white ${selectedCategory === cat ? 'bg-[#0066CC] shadow-lg' : 'bg-black/40'} ${categoryHoverColors[cat] || 'hover:bg-blue-500'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search solutions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-full px-4 py-2 bg-black/40 border border-white/10 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md"
            style={{ minWidth: 220 }}
          />
        </div>
        {/* Animated Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filtered.map(sol => (
              <motion.div
                key={sol.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                className="relative group glass-card bg-black/60 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl flex flex-col transition-all overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/80 border border-cyan-700 shadow-md">
                    {sol.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{sol.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {sol.platforms.map(p => {
                        const key = p.trim();
                        const color = platformBadgeColors[key] || platformBadgeColors[key.toLowerCase()] || 'pink';
                        return (
                          <Badge key={p} color={color} mini={true} className="rounded-full">{p}</Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sol.industries.map(ind => (
                    <Badge key={ind} color="default" mini={true} className="rounded-full">{ind}</Badge>
                  ))}
                </div>
                <div className="text-cyan-300 font-semibold mb-2">{sol.impact}</div>
                <div className="text-cyan-100 text-sm mb-8">{sol.details}</div>
                {/* Hover Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 right-0 bottom-0 p-4 bg-black/80 backdrop-blur-lg flex flex-col items-start justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all rounded-b-2xl"
                  style={{ minHeight: 80 }}
                >
                  <RainbowButton asChild className="mb-2 text-sm px-4 py-1.5 rounded-lg h-auto min-h-0">
                    <a href="#" className="text-sm px-4 py-1.5 rounded-lg h-auto min-h-0">Learn More</a>
                  </RainbowButton>
                  <div className="text-cyan-200 text-xs mt-1">Learn about this solution</div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
} 