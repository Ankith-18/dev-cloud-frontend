"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  CloudArrowUpIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      
      // FIXED: Direct redirect without setTimeout
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Forgot Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20" />
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-2xl">
          
          {/* Back to Login Link */}
          <Link href="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Login
          </Link>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
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
            Forgot Password?
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-400 text-center mb-8"
          >
            Enter your email and we'll send you a 6-digit OTP to reset your password.
          </motion.p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={isSubmitted}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || isSubmitted}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Send OTP
                  <PaperAirplaneIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Help Text */}
          <p className="mt-6 text-center text-xs text-gray-500">
            We'll send a 6-digit verification code to your email.
          </p>
        </div>
      </motion.div>
    </div>
  )
}