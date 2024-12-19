'use client'

import { motion } from 'framer-motion';
import { useSensorData } from '@/hooks/useSensorData';
import { formatDistance } from '@/utils/formatDistance';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const data = useSensorData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl p-4 md:p-8 max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Water Level Monitoring System</h1>
        {data ? (
          <Dashboard sensorData={data} />
        ) : (
          <p className="text-center text-gray-600">Loading sensor data...</p>
        )}
      </motion.div>
    </div>
  );
}

