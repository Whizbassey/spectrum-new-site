'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, BarChart3, MessageSquare, Database, Shield, Cpu, Globe } from 'lucide-react'

export default function Services() {
  const services = [
    {
      id: 'process-automation',
      icon: <Zap className="w-8 h-8" />,
      title: 'Process Automation',
      description: 'Streamline your business operations with intelligent automation solutions.',
      features: [
        'Workflow automation and optimization',
        'Document processing and management',
        'Email and communication automation',
        'Data entry and validation automation',
        'Integration with existing systems'
      ],
      benefits: ['Reduce manual work by 80%', 'Improve accuracy and consistency', 'Scale operations efficiently', '24/7 automated processing']
    },
    {
      id: 'chatbots',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'AI Chatbots',
      description: 'Enhance customer experience with intelligent conversational AI.',
      features: [
        'Natural language processing',
        'Multi-language support',
        'Integration with CRM systems',
        'Sentiment analysis',
        'Human handoff capabilities'
      ],
      benefits: ['24/7 customer support', 'Instant response times', 'Reduce support costs by 60%', 'Improve customer satisfaction']
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights for better decision making.',
      features: [
        'Real-time data processing',
        'Predictive analytics',
        'Custom dashboards and reports',
        'Data visualization',
        'Business intelligence tools'
      ],
      benefits: ['Make data-driven decisions', 'Identify growth opportunities', 'Optimize business processes', 'Predict market trends']
    },
    {
      id: 'ml',
      icon: <Brain className="w-8 h-8" />,
      title: 'Machine Learning',
      description: 'Build custom ML models tailored to your specific business needs.',
      features: [
        'Custom model development',
        'Predictive modeling',
        'Image and text recognition',
        'Recommendation systems',
        'Anomaly detection'
      ],
      benefits: ['Personalized customer experiences', 'Automated decision making', 'Improved product recommendations', 'Fraud detection']
    }
  ]

  const technologies = [
    { name: 'Python', icon: '🐍' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'PyTorch', icon: '🔥' },
    { name: 'OpenAI GPT', icon: '🤖' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Google Cloud', icon: '🌐' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' }
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive AI solutions designed to transform your business operations 
              and drive measurable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white mb-8">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h2>
                  <p className="text-xl text-gray-600 mb-8">{service.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <div className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <div className="aspect-video bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{service.icon}</div>
                      <p className="text-gray-600 font-medium">{service.title} Demo</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Technologies We Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build robust and scalable AI solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology to deliver successful AI solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understand your business needs and objectives' },
              { step: '02', title: 'Strategy', description: 'Design the optimal AI solution architecture' },
              { step: '03', title: 'Development', description: 'Build and test the AI solution' },
              { step: '04', title: 'Deployment', description: 'Launch and monitor the solution' }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Let's discuss how our AI services can transform your business.
            </p>
            <a href="/contact" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Schedule a Consultation
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 