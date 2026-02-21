"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { 
  CloudArrowUpIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // REMOVED DELAY - Instant navigation!
    router.push('/dashboard')
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`Signing up with ${provider}`)
    router.push('/dashboard') // Instant navigation
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center p-4">
      {/* Animated Background - same as login */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          rotateX: mousePosition.y * 0.5,
          rotateY: mousePosition.x * 0.5,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20" />
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-2xl">
          
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50"></div>
              <CloudArrowUpIcon className="h-12 w-12 text-blue-400 relative z-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Create Account
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-400 text-center mb-8"
          >
            Join thousands of developers on DevCloud
          </motion.p>

          {/* Social Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-3 mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialSignup('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-gray-800 rounded-xl transition-all text-gray-300 hover:text-white group"
            >
              <FaGithub className="h-5 w-5" />
              <span className="text-sm font-medium">Sign up with GitHub</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialSignup('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-gray-800 rounded-xl transition-all text-gray-300 hover:text-white group"
            >
              <FcGoogle className="h-5 w-5" />
              <span className="text-sm font-medium">Sign up with Google</span>
            </motion.button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">or</span>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-600"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-600"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 bg-white/5 border border-gray-800 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms</span>
                {' '}and{' '}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center group"
            >
              Create Account
              <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.form>

          {/* Sign in link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            Already have an account?{' '}
            <Link href="/login">
              <span className="text-blue-400 hover:text-blue-300 font-medium cursor-pointer transition-colors">
                Sign in
              </span>
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}