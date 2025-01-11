'use client'

import BottomNav from '@/components/BottomNav'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext'

export default function ChatPage() {
  const { email } = useUser()

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: "ai" },
  ])
  const [userDetails, setUserDetails] = useState(null)
  const [userInput, setUserInput] = useState('')

  // Fetch user details on initial load
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!email) return;
      try {
        const response = await fetch(`http://65.1.209.37:8080/user-details?email=${email}`)
        if (!response.ok) {
          throw new Error(`Error fetching user details: ${response.status} ${response.statusText}`);
        }
        const data = await response.json()
        setUserDetails(data)
      } catch (error) {
        console.error("Error fetching user details:", error)
      }
    }
    fetchUserDetails()
  }, [email])

  // Function to send message
  const sendMessage = async (e) => {
    e.preventDefault()
    if (userInput.trim() === "") return

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: userInput, sender: 'user' },
    ])

    if (userDetails) {
      const { riskAppetite, salary } = userDetails
      const postData = {
        user_input: userInput,
        budget_amt: salary * 3,
        budget_type: 'low',
        risk_apetite: riskAppetite || "medium",
      }

      try {
        const response = await fetch('http://65.1.209.37:1234/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })

        if (!response.ok) {
          throw new Error(`Error sending message: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()

        // Add AI response
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 2, text: data?.response || "Sorry, I couldn't get a response.", sender: 'ai' },
        ])

        setUserInput('')
      } catch (error) {
        console.error("Error sending message:", error)
        alert(`Network error: ${error.message}`)
      }
    } else {
      console.error("User details are not available.")
    }
  }

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
              <form className="flex gap-4" onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
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
