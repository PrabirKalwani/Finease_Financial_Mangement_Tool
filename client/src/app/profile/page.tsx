'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'
import LogoutButton from '@/components/LogoutButton'
import { useTheme } from '@/context/ThemeContext'
import UserDetailsModal from '@/components/UserDetailsModal'

export default function ProfilePage() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  // In a real app, you would get this from your auth context or state management
  const userEmail = "user@example.com" // Replace this with actual user email

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
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
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Financial Details
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={userEmail}
      />
    </div>
  )
} 