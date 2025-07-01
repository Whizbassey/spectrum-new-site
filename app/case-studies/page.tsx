'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, Building, ShoppingCart, Heart } from 'lucide-react'

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: 'E-commerce Automation',
      company: 'TechRetail Inc.',
      industry: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      challenge: 'Manual order processing was taking 4-6 hours daily, causing delays and customer complaints.',
      solution: 'Implemented AI-powered order processing system with automated inventory management.',
      results: [
        { metric: '80%', label: 'Reduction in processing time' },
        { metric: '95%', label: 'Customer satisfaction increase' },
        { metric: '$50K', label: 'Annual cost savings' }
      ],
      description: 'TechRetail Inc. was struggling with manual order processing that was consuming valuable time and resources. Our AI solution automated the entire process, from order receipt to inventory updates.'
    },
    {
      id: 2,
      title: 'Customer Support Chatbot',
      company: 'HealthCare Plus',
      industry: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      challenge: '24/7 customer support was expensive and response times were inconsistent.',
      solution: 'Deployed intelligent chatbot with natural language processing for patient inquiries.',
      results: [
        { metric: '60%', label: 'Reduction in support costs' },
        { metric: '24/7', label: 'Availability' },
        { metric: '2min', label: 'Average response time' }
      ],
      description: 'HealthCare Plus needed a solution to provide round-the-clock support without the high costs of human agents. Our AI chatbot handles 80% of inquiries automatically.'
    },
    {
      id: 3,
      title: 'Predictive Analytics',
      company: 'Manufacturing Corp',
      industry: 'Manufacturing',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      challenge: 'Equipment failures were causing costly downtime and production delays.',
      solution: 'Developed ML model to predict equipment maintenance needs and prevent failures.',
      results: [
        { metric: '90%', label: 'Fewer unplanned outages' },
        { metric: '30%', label: 'Reduction in maintenance costs' },
        { metric: '15%', label: 'Increase in productivity' }
      ],
      description: 'Manufacturing Corp was experiencing frequent equipment failures that disrupted production. Our predictive analytics solution now forecasts maintenance needs with 95% accuracy.'
    },
    {
      id: 4,
      title: 'Document Processing',
      company: 'Legal Associates',
      industry: 'Legal Services',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      challenge: 'Manual document review was time-consuming and prone to human error.',
      solution: 'AI-powered document analysis system for contract review and legal research.',
      results: [
        { metric: '75%', label: 'Faster document review' },
        { metric: '99%', label: 'Accuracy rate' },
        { metric: '40%', label: 'Cost reduction' }
      ],
      description: 'Legal Associates was spending countless hours on document review. Our AI solution now processes and analyzes legal documents in minutes instead of hours.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Projects Completed', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '50+', label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
    { number: '$2M+', label: 'Cost Savings', icon: <DollarSign className="w-6 h-6" /> },
    { number: '99%', label: 'Success Rate', icon: <Clock className="w-6 h-6" /> }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Real success stories from businesses that have transformed their operations 
              with our AI solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-primary-600">{study.industry}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{study.company}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                  <p className="text-gray-600 mb-6">{study.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-primary-600 mb-1">{result.metric}</div>
                        <div className="text-xs text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Spectrum AI transformed our entire operation. The automation solution saved us countless hours and improved our customer satisfaction dramatically.",
                author: "Sarah Johnson",
                role: "CEO, TechRetail Inc.",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                quote: "The AI chatbot solution exceeded our expectations. It handles 80% of our customer inquiries automatically, allowing our team to focus on complex cases.",
                author: "Michael Chen",
                role: "CTO, HealthCare Plus",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              },
              {
                quote: "Predictive analytics has revolutionized our maintenance schedule. We've reduced downtime by 90% and saved millions in operational costs.",
                author: "Emily Rodriguez",
                role: "Operations Director, Manufacturing Corp",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <Heart className="w-5 h-5 text-red-500 mr-1" />
                  <Heart className="w-5 h-5 text-red-500 mr-1" />
                  <Heart className="w-5 h-5 text-red-500 mr-1" />
                  <Heart className="w-5 h-5 text-red-500 mr-1" />
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
            <p className="text-xl opacity-90 mb-8">
              Let's discuss how our AI solutions can transform your business operations.
            </p>
            <a href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 