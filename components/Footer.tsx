'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#17686f] text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Nome da loja */}
        <div className="text-xl font-bold">🐾   Moda Com Atitude Pet</div>

        {/* Links rápidos */}
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/cart" className="hover:underline">Carrinho</Link>
          <Link href="/quem-somos" className="hover:underline">Quem Somos</Link>
          {/* <Link href="/admin" className="hover:underline">Admin</Link> */}
        </div>

        {/* Copyright */}
        <div className="text-sm">&copy; {new Date().getFullYear()} AuChic By Rose. Todos os direitos reservados.</div>

      </div>
    </footer>
  )
}
