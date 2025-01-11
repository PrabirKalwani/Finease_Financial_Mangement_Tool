'use client';

import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatBotPage from '@/components/ChatBotPage'; // Assuming ChatPage is in the same folder
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function LearnPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatModalType, setChatModalType] = useState("");
  const [chatModalDesc, setChatModalDesc] = useState("");
  function chatModalCheck( title:string, desc:string ){
    setShowChatModal(true);
    setChatModalType(title);
    setChatModalDesc(desc);
  } // State for dialog visibility

  const courses = [
    { category: 'Investing', title: 'Stocks', description: 'Stocks represent ownership in a company. When you buy a stock, you are purchasing a small part of that company.' },
    { category: 'Investing', title: 'Bonds', description: 'Bonds are a type of loan made by investors to borrowers, typically corporations or governments.' },
    { category: 'Investing', title: 'Mutual Funds', description: 'Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.' },
    { category: 'Investing', title: 'ETFs', description: 'ETFs (Exchange-Traded Funds) are investment funds traded on stock exchanges, much like stocks.' },
    { category: 'Wealth Management', title: 'Diversification', description: 'Diversification is a strategy that mixes a wide variety of investments within a portfolio.' },
    { category: 'Wealth Management', title: 'ROI', description: 'ROI (Return on Investment) measures the profitability of an investment as a percentage of the original cost.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Learn
          </motion.h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pb-24">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                    >
                      {course.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {course.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => chatModalCheck(course.title, course.description)} // Open the dialog
                    className="mt-4 w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <BottomNav />

      {/* ShadCN Dialog for ChatPage */}
      <Dialog open={showChatModal} onOpenChange={setShowChatModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Learn about {chatModalType}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ChatBotPage title={chatModalType} desc={chatModalDesc}/> {/* Render the ChatPage content here */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}