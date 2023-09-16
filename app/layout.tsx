import Modal from '@/components/Modal'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trello Appwrite',
  description: 'Next generation open-source app for Trello created by nuhptr',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className='bg-[#f5f6f8]'>
        {children}

        {/* don't forget add module to this file */}
        <Modal />
      </body>
    </html>
  )
}
