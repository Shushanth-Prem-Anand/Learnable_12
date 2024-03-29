import Navbar from '@/components/navbar/main-nav'
import './globals.css'
import type { Metadata } from 'next'
import { TProvider } from '@/providers/toast-provider'
import "@uploadthing/react/styles.css";
import myUser from './actions/getUser'
import { ThemeProvider } from "@/components/ui/theme-provider"



export const metadata: Metadata = {
  title: 'Learnable.app',
  description: 'Create and sell your online courses',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await myUser()

  return (
    <html lang="en">
      <body>
        <TProvider/>
        <ThemeProvider attribute='class'>
        <Navbar user={user} />
        {children}
        </ThemeProvider>
        </body>
    </html>
  )
}
