'use client'

import Link from 'next/link'
import { useCart } from '../app/context/CartContext'
import Image from 'next/image'
import Logo from "../assets/img/logo.jpeg"

export default function HeaderDetail() {
    const { cart } = useCart()
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <header className="w-full bg-[#17686f] text-white p-4">
            <div className="w-full px-4">

                {/* Mobile: Logo + Carrinho */}
                <div className="flex justify-between items-center md:hidden mb-4">
                    <Link href="/" className="text-2xl font-bold">
                        <div className="flex items-center space-x-2">
                            <Image className="rounded-[48px]" src={Logo} alt="Logo" width={100} height={100} />
                            <span>🐾</span>
                        </div>
                    </Link>

                    <Link href="/cart" className="flex items-center space-x-2">
                        <span className="text-2xl">🛒</span>
                        <span className="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">{totalQuantity}</span>
                    </Link>
                </div>

                {/* Desktop: Logo + Carrinho */}
                <div className="hidden md:flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        <div className="flex items-center space-x-2">
                            <Image className="rounded-[48px]" src={Logo} alt="Logo" width={100} height={100} />
                            <span>🐾</span>
                        </div>
                    </Link>

                    <Link href="/cart" className="flex items-center space-x-2">
                        <span className="text-2xl">🛒</span>
                        <span className="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">{totalQuantity}</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}
