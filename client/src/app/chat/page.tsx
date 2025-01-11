'use client'

import BottomNav from '@/components/BottomNav'
import { useTheme } from '@/context/ThemeContext'

export default function ChatPage() {
  const { isDarkMode } = useTheme()
  
  const messages = [
    { id: 1, text: "Hi! How can I help you today?", sender: "ai" },
    { id: 2, text: "I need help with Python loops", sender: "user" },
    { id: 3, text: "I'd be happy to help you understand Python loops. What specific aspect would you like to learn about?", sender: "ai" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-24">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Chat Messages */}
            <div className="h-[calc(100vh-300px)] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t dark:border-gray-700 p-4">
              <form className="flex gap-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
} 