'use client'

import BottomNav from '@/components/BottomNav'
import { useTheme } from '@/context/ThemeContext'

export default function LearnPage() {
  const { isDarkMode } = useTheme()
  
  const courses = [
    {
      title: 'Python Fundamentals',
      description: 'Learn the basics of Python programming language',
      progress: 75,
      lessons: 12,
      category: 'Programming',
      level: 'Beginner'
    },
    {
      title: 'Data Structures',
      description: 'Master common data structures and their implementations',
      progress: 45,
      lessons: 15,
      category: 'Computer Science',
      level: 'Intermediate'
    },
    {
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning concepts',
      progress: 20,
      lessons: 10,
      category: 'AI/ML',
      level: 'Advanced'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learn</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-24">
        <div className="px-4 py-6 sm:px-0">
          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    }`}>
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{course.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{course.lessons} Lessons</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">{course.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
} 