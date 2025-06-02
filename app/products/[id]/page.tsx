'use client'

import ProductDetail from '../../../components/ProductDetail'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Product } from '../../../lib/types'
import Header from '../../../components/HeaderDetails'
import Spinner from '../../../components/Load'
import { useCart } from '../../../app/context/CartContext'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { addToCart } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    setLoading(true)
    fetch(`https://loja-3bvt.onrender.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Produto não encontrado')
        return res.json()
      })
      .then(data => {
        if (data.error) {
          setProduct(null)
          setError('Produto não encontrado')
        } else {
          setProduct(data)
          setError(null)
        }
      })
      .catch(err => {
        console.error(err)
        setError('Erro ao carregar produto')
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      router.push('/cart')
    }
  }

  if (loading) return <Spinner />

  if (error) return <p className="text-center m-4 text-red-500">{error}</p>

  if (!product) return <p className="text-center m-4">Produto não encontrado.</p>

  return (
    <>
      <Header />
      <div className="max-w-[600px] min-h-[705px] w-full mx-auto p-4">
        <ProductDetail product={product} onAddToCart={handleAddToCart} />
      </div>
    </>
  )
}
