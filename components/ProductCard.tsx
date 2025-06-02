import Link from 'next/link'
import { Product } from '../lib/types'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-[#17686f] rounded p-4">
      <img 
        src={`https://loja-3bvt.onrender.com/image/${product.imageId}`} 
        alt={product.name} 
        className="w-full h-110 object-cover mb-2"
      />
      <h2 className="font-bold text-[18px]">{product.name}</h2>
      <p className="text-gray-600 text-[16px]">R$ {product.price.toFixed(2)}</p>
      <Link 
        href={`/products/${product.id}`} 
        className="text-[#17686f] mt-2 inline-block text-[16px] font-bold hover:text-[#01cfc0] transition-colors"
      >
        Ver detalhes
      </Link>
    </div>
  )
}
