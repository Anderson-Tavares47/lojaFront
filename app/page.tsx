'use client'

import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { Product } from '../lib/types'
import Header from '../components/Header'

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('https://loja-3bvt.onrender.com/products')
            .then(res => res.json())
            .then(setProducts)
    }, [])

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <Header search={search} onSearchChange={setSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-5">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full">Nenhum produto encontrado.</p>
                )}
            </div>
        </>
    )
}
