import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cursor Tutorial | Learn AI-Powered Coding',
  description: 'A beginner-friendly guide to mastering Cursor, the AI-powered code editor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

