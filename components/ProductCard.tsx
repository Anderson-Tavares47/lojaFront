import Link from 'next/link'
import { Product } from '../lib/types'

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null

  return (
    <div className="border border-[#17686f] rounded p-4">
      <Link href={`/products/${product.id}`}>
        <img
          src={`https://loja-weld-gamma.vercel.app/image/${product.imageId}`}
          alt={product.name}
          className="w-full h-110 object-cover mb-2 cursor-pointer"
        />
      </Link>
      <h2 className="font-bold text-[18px]">{product.name}</h2>
      <p className="text-gray-600 text-[16px]">
        R$ {product.price.toFixed(2)}
      </p>
      <Link
        href={`/products/${product.id}`}
        className="text-[#17686f] mt-2 inline-block text-[16px] font-bold hover:text-[#01cfc0] transition-colors"
      >
        Ver detalhes
      </Link>
    </div>
  )
}
