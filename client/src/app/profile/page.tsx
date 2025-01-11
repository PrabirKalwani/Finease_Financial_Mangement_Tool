import BottomNav from '@/components/BottomNav'
import LogoutButton from '@/components/LogoutButton'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-24">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow">
            {/* Profile Header */}
            <div className="p-6 border-b">
              <div className="flex items-center">
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-500">john.doe@example.com</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">85%</p>
                <p className="text-sm text-gray-500">Course Completion</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">24</p>
                <p className="text-sm text-gray-500">Lessons Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">12</p>
                <p className="text-sm text-gray-500">Achievements</p>
              </div>
            </div>

            {/* Settings */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email updates about your progress</p>
                  </div>
                  <button className="bg-indigo-100 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-indigo-600 shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500">Switch between light and dark mode</p>
                  </div>
                  <button className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
} 