'use client'

import BottomNav from '@/components/BottomNav'
import { useTheme } from '@/context/ThemeContext'
import { useUser } from '@/context/UserContext'
import UserDetailsModal from '@/components/UserDetailsModal'

export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { email, showDetailsModal, setShowDetailsModal } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                Welcome to your financial dashboard. Here you can track your investments and manage your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      {email && showDetailsModal && (
        <UserDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          email={email}
        />
      )}
    </div>
  )
}

