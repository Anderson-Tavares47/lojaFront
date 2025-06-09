import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '../lib/types'

interface ProductDetailProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  if (!product) return null

  return (
    <div className="flex flex-col gap-4 max-w-[800px] w-full mx-auto">
      <img
        src={`https://loja-weld-gamma.vercel.app/image/${product.imageId}`}
        alt={product.name}
        className="w-full h-96 object-cover rounded shadow cursor-zoom-in"
        onClick={() => setIsOpen(true)}
      />

      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-700 text-lg">{product.description}</p>
      <p className="text-2xl font-semibold">R$ {product.price?.toFixed(2)}</p>

      {/* 🔁 Botões lado a lado */}
      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-[#17686f] text-white rounded hover:bg-[#117f7c] transition"
        >
          Voltar
        </button>

        <button
          onClick={() => onAddToCart(product)}
          className="px-6 py-3 bg-[#17686f] text-white rounded hover:bg-[#117f7c] transition"
        >
          Adicionar ao carrinho
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={`https://loja-weld-gamma.vercel.app/image/${product.imageId}`}
            alt={product.name}
            className="max-w-[90%] max-h-[90%] object-contain cursor-zoom-out transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
    </div>
  )
}
