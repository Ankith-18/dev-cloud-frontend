"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  CloudArrowUpIcon,
  LockClosedIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  CubeIcon,
  KeyIcon,
  FlagIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  UsersIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BoltIcon,
  CpuChipIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CloudArrowUpIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DevCloud</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Features</a>
              <a href="#products" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Products</a>
              <a href="#pricing" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Pricing</a>
              <a href="#about" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">About</a>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Deploy, Manage, and Scale
              <span className="text-blue-600 dark:text-blue-400 block mt-2">
                Your Cloud Infrastructure
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              The complete developer platform for deploying services, managing secrets, 
              running CI/CD pipelines, and controlling feature flags.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
              <div className="h-10 bg-gray-800 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-xs text-gray-400">devcloud.app/dashboard</div>
              </div>
              <img 
                src="/api/placeholder/1200/600" 
                alt="Dashboard Preview"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
            Trusted by developers from
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {['TechCorp', 'StartupInc', 'DevStudio', 'CloudNine', 'CodeCraft'].map((company) => (
              <div key={company} className="text-gray-400 dark:text-gray-600 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to ship faster
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A complete platform for modern cloud development with all the tools your team needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CubeIcon,
                title: 'Project Management',
                description: 'Organize your services and applications into projects with multiple environments.',
                color: 'blue'
              },
              {
                icon: RocketLaunchIcon,
                title: 'CI/CD Pipelines',
                description: 'Automated build, test, and deployment pipelines with step-by-step execution.',
                color: 'purple'
              },
              {
                icon: CommandLineIcon,
                title: 'Deployments',
                description: 'Zero-downtime deployments with instant rollbacks and environment promotion.',
                color: 'green'
              },
              {
                icon: DocumentTextIcon,
                title: 'Real-time Logs',
                description: 'Centralized logging with search, filters, and real-time streaming.',
                color: 'yellow'
              },
              {
                icon: KeyIcon,
                title: 'Secret Management',
                description: 'Securely store and manage environment variables and API keys.',
                color: 'red'
              },
              {
                icon: FlagIcon,
                title: 'Feature Flags',
                description: 'Gradually roll out features with environment-based feature flags.',
                color: 'indigo'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10K+', label: 'Active Developers' },
              { value: '50K+', label: 'Deployments' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the plan that's right for your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Developer',
                price: '$29',
                description: 'Perfect for individual developers',
                features: ['5 projects', 'Basic CI/CD', 'Community support', '1GB log storage']
              },
              {
                name: 'Team',
                price: '$99',
                description: 'Best for small teams',
                features: ['Unlimited projects', 'Advanced CI/CD', 'Priority support', '10GB log storage', 'Team management'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: ['Everything in Team', 'SLA guarantee', 'Dedicated support', 'Custom integrations', 'SSO']
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border ${
                plan.popular 
                  ? 'border-blue-500 ring-2 ring-blue-500' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}>
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 dark:text-gray-400">/month</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? 'default' : 'outline'} className="w-full">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to streamline your deployments?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of developers who are already shipping faster with DevCloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <CloudArrowUpIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DevCloud</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                The complete developer platform for cloud infrastructure.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'GitHub', 'Discord'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {social}
                  </a>
                ))}
              </div>
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
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} DevCloud. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}