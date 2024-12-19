// Import necessary modules from Next.js
import { NextResponse } from 'next/server';

// Initialize an object to store the latest sensor data
let latestData = {
  distance: 0,
  timestamp: '',
};

// Handle POST requests to /api/sensor-data
export async function POST(request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();

    // Update the latestData object with the received data
    latestData = {
      distance: data.distance,
      timestamp: data.timestamp,
    };

    console.log('Received data:', latestData);
    
    // Respond with success message
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing POST request:', error);
    
    // Respond with an error message
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 400 });
  }
}

// Handle GET requests to /api/sensor-data
export async function GET() {
  // Respond with the latest sensor data
  return NextResponse.json(latestData);
}
