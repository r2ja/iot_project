import { useState, useEffect } from 'react';

interface SensorData {
  distance: number;
  timestamp: string;
}

export function useSensorData() {
  const [data, setData] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensor-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 500);

    return () => clearInterval(interval);
  }, []);

  return data;
}

