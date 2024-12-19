import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Water Level Monitoring System',
  description: 'Real-time dashboard for Arduino-based water level sensor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">Water Level Monitor</h1>
          </div>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

