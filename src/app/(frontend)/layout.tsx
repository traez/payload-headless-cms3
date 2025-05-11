import React from 'react'
import './styles.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NextJsTopLoader from '@/lib/NextJsTopLoader'

export const metadata = {
  description: 'Created by Trae Zeeofor',
  title: 'Payload Headless CMS ToDo',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="antialiased flex flex-col justify-center items-center min-h-screen w-full font-trebuchetMs">
        <NextJsTopLoader />
        <Header />
        <main className="flex-grow h-full w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
