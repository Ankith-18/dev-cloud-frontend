"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PaperAirplaneIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface Message {
  id: number
  type: 'user' | 'bot'
  message: string
}

export function ProfessionalChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'bot', 
      message: '👋 Hello! I\'m your DevCloud AI Assistant. How can I help you today?'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  const suggestedQuestions = [
    'How do I deploy?',
    'What are feature flags?',
    'How to manage secrets?',
    'CI/CD pipelines?',
    'Pricing plans?'
  ]

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes('deploy')) {
      return `**To deploy your first project:**

1. Click "New Project" from dashboard
2. Connect your GitHub repository
3. Select your project type
4. Click "Deploy"

Your app will be live in minutes! 🚀`
    }

    if (input.includes('feature flag')) {
      return `**Feature Flags** let you control features:

• Enable/disable without redeploying
• Roll out to specific users
• Test in production safely

Go to Feature Flags section to create one!`
    }

    if (input.includes('secret')) {
      return `**Secrets Management** keeps your keys safe:

• AES-256 encryption
• Environment-specific secrets
• Audit logging

Add secrets in the Secrets page! 🔐`
    }

    if (input.includes('pipeline') || input.includes('ci/cd')) {
      return `**CI/CD Pipelines** automate your workflow:

• Build → Test → Deploy
• Parallel execution
• Automatic retry on failure

Set up your first pipeline in Projects!`
    }

    if (input.includes('price') || input.includes('cost') || input.includes('plan')) {
      return `**Pricing Plans:**

🚀 Developer - $29/month
👥 Team - $99/month  
🏢 Enterprise - Custom

All plans include 14-day free trial!`
    }

    if (input.includes('hello') || input.includes('hi')) {
      return `Hello! 👋

I can help with:
• Deployments
• CI/CD Pipelines
• Secrets
• Feature Flags
• Pricing

What would you like to know?`
    }

    return `I can help with deployments, CI/CD, secrets, feature flags, and pricing. What specifically would you like to know?`
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isTyping) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      message: inputMessage
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot typing
    setTimeout(() => {
      const response = getBotResponse(inputMessage)
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        message: response
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestedClick = (question: string) => {
    setInputMessage(question)
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent
      handleSendMessage(fakeEvent)
    }, 100)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-300" />
                  <h3 className="font-semibold text-white text-sm">DevCloud AI</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 space-y-3 bg-gray-900">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      {msg.type === 'user' ? (
                        <UserCircleIcon className="h-5 w-5 text-blue-400" />
                      ) : (
                        <SparklesIcon className="h-5 w-5 text-purple-400" />
                      )}
                    </div>
                    <div className={`p-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}>
                      <p className="text-xs whitespace-pre-line">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="h-5 w-5 text-purple-400" />
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-3 py-2 bg-gray-900 border-t border-gray-800">
              <div className="flex flex-wrap gap-1">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedClick(q)}
                    className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-gray-900 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 text-xs"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="h-4 w-4 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}