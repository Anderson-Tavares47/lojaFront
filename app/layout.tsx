import './globals.css'
import { ReactNode } from 'react'
import { CartProvider } from './context/CartContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="max-w mx-auto font-sans">
        <CartProvider>
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  )
}