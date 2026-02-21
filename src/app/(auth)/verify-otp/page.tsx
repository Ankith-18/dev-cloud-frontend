"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CloudArrowUpIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  KeyIcon
} from '@heroicons/react/24/outline'

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'your email'
  
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return
    
    if (value.length > 1) return // Only allow single digit
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError('') // Clear error when user types

    // Auto-focus next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Focus previous input on backspace when current is empty
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter complete 6-digit OTP')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/reset-password?email=${encodeURIComponent(email)}`)
    }, 1500)
  }

  const handleResendOTP = () => {
    setCanResend(false)
    setTimer(60)
    setOtp(['', '', '', '', '', ''])
    setError('')
    
    // Focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)
    
    alert('New OTP sent to your email!')
  }

  // Auto-focus first input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 500)
  }, [])

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

      {/* OTP Verification Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20" />
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 shadow-2xl">
          
          {/* Back to Forgot Password */}
          <Link href="/forgot-password" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
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
              <KeyIcon className="h-12 w-12 text-blue-400 relative z-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Verify OTP
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-400 text-center mb-2"
          >
            Enter the 6-digit code sent to
          </motion.p>
          <p className="text-blue-400 text-center font-medium mb-8 break-all">{email}</p>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}

          {/* OTP Input Form - THIS IS THE 6 DIGIT BOXES */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold bg-white/5 border-2 border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white transition-all"
                  required
                  disabled={isLoading}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center group disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Verify OTP
                  <CheckCircleIcon className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{' '}
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-600">Resend in {timer}s</span>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}