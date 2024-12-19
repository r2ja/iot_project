const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');

const API_URL = 'http://localhost:3000/api/sensor-data';

function connectToSerialPort() {
  const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 }, (err) => {
    if (err) {
      console.error('Error opening port:', err.message);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectToSerialPort, 5000);
      return;
    }
    console.log('Serial port opened successfully');
    
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    parser.on('data', async (data) => {
      try {
        const sensorData = JSON.parse(data);
        console.log('Received data:', sensorData);

        const response = await axios.post(API_URL, sensorData);
        console.log('API response:', response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    });
  });

  port.on('error', (err) => {
    console.error('Serial port error:', err.message);
    console.log('Attempting to reconnect...');
    setTimeout(connectToSerialPort, 5000);
  });
}

console.log('Attempting to connect to Arduino...');
connectToSerialPort();
