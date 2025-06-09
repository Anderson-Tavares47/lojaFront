'use client'

import Link from 'next/link'
import { useCart } from '../app/context/CartContext'
import Image from 'next/image'
import Logo from "../assets/img/logo.jpeg"

interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  const { cart } = useCart()
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  const searchInput = (
    <input
      type="text"
      placeholder="Buscar produtos..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full bg-white p-2 rounded border border-gray-300 text-black focus:outline-none"
    />
  )

  return (
    <header className="w-full bg-[#17686f] text-white p-4">
      <div className="w-full px-4">
        {/* Mobile */}
        <div className="flex flex-col gap-2 md:hidden mb-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <div className="flex items-center space-x-2">
                <Image className="rounded-[48px]" src={Logo} alt="Logo" width={80} height={80} />
                <span>🐾</span>
              </div>
            </Link>

            <Link href="/cart" className="flex items-center space-x-2">
              <span className="text-2xl">🛒</span>
              <span className="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">
                {cartQuantity}
              </span>
            </Link>
          </div>

          <div className="flex justify-between items-center text-sm px-1">
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline whitespace-nowrap"
            >
              📞 <span className="font-medium">Contato:</span> (11) 99999-9999
            </a>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="w-full md:hidden mb-2">
          {searchInput}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <div className="flex items-center space-x-2">
              <Image className="rounded-[48px]" src={Logo} alt="Logo" width={100} height={100} />
              <span>🐾</span>
            </div>
          </Link>

          <div className="w-1/2">
            {searchInput}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/5551995936074"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white hover:underline whitespace-nowrap"
            >
              📞 <span className="font-medium">Contato:</span> (51) 99593-6074
            </a>

            <Link href="/cart" className="flex items-center space-x-2">
              <span className="text-2xl">🛒</span>
              <span className="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">
                {cartQuantity}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
