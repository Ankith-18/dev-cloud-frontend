"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { 
  CloudArrowUpIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  CubeIcon,
  KeyIcon,
  FlagIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ChartBarIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! I\'m your DevCloud assistant. How can I help you today?' },
    { id: 2, type: 'user', message: 'How do I deploy my first project?' },
    { id: 3, type: 'bot', message: 'You can start by clicking "Start Free Trial" above! Then create a project, add your code, and we\'ll handle the rest. 🚀' },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number, delay: number}>>([])
  
  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 })

  // Smooth scroll animations
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  // Generate stars
  useEffect(() => {
    const newStars = []
    for (let i = 0; i < 200; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5
      })
    }
    setStars(newStars)
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return
    
    const newUserMessage = { id: Date.now(), type: 'user', message: inputMessage }
    setChatMessages(prev => [...prev, newUserMessage])
    setInputMessage('')
    
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        type: 'bot', 
        message: getBotResponse(inputMessage) 
      }
      setChatMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    if (input.includes('deploy') || input.includes('deployment')) {
      return "Deploying is easy! Just create a project, connect your repository, and we'll automatically build and deploy your code. Would you like a step-by-step guide? 📦"
    } else if (input.includes('pipeline') || input.includes('ci/cd')) {
      return "Our CI/CD pipelines are fully automated. You can configure them in your project settings. We support GitHub Actions, GitLab CI, and more! 🔄"
    } else if (input.includes('secret') || input.includes('password')) {
      return "Secrets are securely encrypted and stored. You can manage them in the Secrets section of your project dashboard. 🔐"
    } else if (input.includes('feature flag') || input.includes('flag')) {
      return "Feature flags let you roll out features gradually. Toggle them on/off in real-time without redeploying! 🚩"
    } else if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return "We offer flexible pricing plans starting from $29/month for developers. Check our pricing section for more details! 💰"
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello there! 👋 How can I assist you with your cloud deployment needs today?"
    } else {
      return "That's a great question! I'd recommend checking out our documentation or you can ask me something more specific about deployments, pipelines, secrets, or feature flags! 📚"
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Stars Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black to-purple-950/30" />
        
        {/* Multiple Tiny Stars */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: 0.7,
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* SIMPLIFIED NAVIGATION - GUARANTEED TO WORK */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo as simple Link */}
            <Link href="/" className="flex items-center space-x-2">
              <CloudArrowUpIcon className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">DevCloud</span>
            </Link>

            {/* SIMPLE BUTTONS - NO COMPLEX ANIMATIONS */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <SparklesIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Welcome to the future of cloud deployment</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Deploy, Manage, and Scale
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Your Cloud Infrastructure
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            The complete developer platform for deploying services, managing secrets, 
            running CI/CD pipelines, and controlling feature flags.
          </p>

          {/* SIMPLE HERO BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
            >
              Start Free Trial
              <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
            </Link>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </button>
          </div>

          3D Dashboard Preview
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
              <div className="h-12 bg-gray-800 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400">devcloud.app/dashboard</div>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                <div className="grid grid-cols-3 gap-4 h-full">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-700/50 rounded-xl p-4">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg mb-3"></div>
                      <div className="h-3 w-20 bg-gray-600 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chat Bot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {isChatOpen ? (
          <span className="text-white text-lg font-bold">×</span>
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        )}
      </button>

      {/* AI Chat Board */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-5 w-5 text-yellow-300" />
                <h3 className="font-semibold text-white">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <span className="text-lg">×</span>
              </button>
            </div>
            <p className="text-xs text-blue-100 mt-1">Ask me anything about DevCloud</p>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 ${msg.type === 'user' ? 'ml-2' : 'mr-2'}`}>
                    {msg.type === 'user' ? (
                      <UserCircleIcon className="h-8 w-8 text-blue-400" />
                    ) : (
                      <SparklesIcon className="h-8 w-8 text-purple-400" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg disabled:opacity-50"
              >
                <PaperAirplaneIcon className="h-5 w-5 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Try asking: "How do I deploy?" or "What are feature flags?"</p>
          </form>
        </div>
      )}

      {/* Trusted By Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-12">
            Trusted by innovative companies
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {['TechCorp', 'StartupInc', 'DevStudio', 'CloudNine', 'CodeCraft'].map((company, i) => (
              <div key={company} className="text-gray-600 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to ship faster
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A complete platform for modern cloud development with all the tools your team needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CubeIcon,
                title: 'Project Management',
                description: 'Organize your services and applications into projects with multiple environments.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: RocketLaunchIcon,
                title: 'CI/CD Pipelines',
                description: 'Automated build, test, and deployment pipelines with step-by-step execution.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: CommandLineIcon,
                title: 'Deployments',
                description: 'Zero-downtime deployments with instant rollbacks and environment promotion.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: DocumentTextIcon,
                title: 'Real-time Logs',
                description: 'Centralized logging with search, filters, and real-time streaming.',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: KeyIcon,
                title: 'Secret Management',
                description: 'Securely store and manage environment variables and API keys.',
                color: 'from-red-500 to-rose-500'
              },
              {
                icon: FlagIcon,
                title: 'Feature Flags',
                description: 'Gradually roll out features with environment-based feature flags.',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl p-3 mb-6`}>
                    <feature.icon className="h-full w-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-30" />
            <div className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to streamline your deployments?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of developers who are already shipping faster with DevCloud.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup" 
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Start Free Trial
                </Link>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                  Chat with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <CloudArrowUpIcon className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">DevCloud</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The complete developer platform for cloud infrastructure.
              </p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Documentation', 'API Reference']
              },
              {
                title: 'Resources',
                links: ['Blog', 'Community', 'Support', 'Status']
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Contact', 'Privacy']
              }
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} DevCloud. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

