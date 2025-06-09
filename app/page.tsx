'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Load'
import { Product } from '../lib/types'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://loja-weld-gamma.vercel.app/products')
        if (!res.ok) throw new Error('Erro ao buscar produtos')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product && product.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />

      {/* Spinner fora da grid */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-5 min-h-[705px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(
              (product) =>
                product?.id && (
                  <ProductCard key={product.id} product={product} />
                )
            )
          ) : (
            <p className="text-center col-span-full">Nenhum produto encontrado.</p>
          )}
        </div>
      )}
    </>
  )
}
