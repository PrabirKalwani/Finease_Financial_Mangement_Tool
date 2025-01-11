'use client'
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';


export default function LearnPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  const courses = [
    { title: 'Stocks', description: 'Stocks represent ownership in a company. When you buy a stock, you are purchasing a small part of that company.' },
    { title: 'Bonds', description: 'Bonds are a type of loan made by investors to borrowers, typically corporations or governments.' },
    { title: 'Mutual Funds', description: 'Mutual funds pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.' },
    { title: 'ETFs', description: 'ETFs (Exchange-Traded Funds) are investment funds traded on stock exchanges, much like stocks.' },
    { title: 'Diversification', description: 'Diversification is a strategy that mixes a wide variety of investments within a portfolio.' },
    { title: 'ROI', description: 'ROI (Return on Investment) measures the profitability of an investment as a percentage of the original cost.' },
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
                      {course.title}
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
                    onClick={() => router.push('/chatbot')}
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
    </div>
  );
}
