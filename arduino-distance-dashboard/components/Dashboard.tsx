import { motion } from 'framer-motion';
import { formatDistance } from '@/utils/formatDistance';


interface SensorData {
  distance: number;
  timestamp: string;
}

interface DashboardProps {
  sensorData: SensorData;
}

const Dashboard: React.FC<DashboardProps> = ({ sensorData }) => {
  const getPercentage = (distance: number) => {
    const percentage = ((100 - distance) / 100) * 100;
    return Math.max(0, Math.min(percentage, 100));
  };

  const isMotorOn = sensorData.distance > 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Water Level</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">Current Level:</span>
          <motion.span
            key={sensorData.distance}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-blue-600"
          >
            {formatDistance(sensorData.distance)}
          </motion.span>
        </div>
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${getPercentage(sensorData.distance)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Motor Status</h2>
        <div className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full ${isMotorOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-lg font-medium">{isMotorOn ? 'ON' : 'OFF'}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          The motor is {isMotorOn ? 'running' : 'not running'} based on the current water level.
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">System Information</h2>
        <p className="mb-2"><span className="font-medium">Last Updated:</span> {new Date().toLocaleString()}</p>
        <p className="mb-2"><span className="font-medium">Arduino Timestamp:</span> {sensorData.timestamp}</p>
        <p><span className="font-medium">System Status:</span> <span className="text-green-600">Operational</span></p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600">Motor turned on at 14:32:45</li>
          <li className="text-sm text-gray-600">Water level reached 75% at 14:30:12</li>
          <li className="text-sm text-gray-600">System maintenance performed at 12:00:00</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

