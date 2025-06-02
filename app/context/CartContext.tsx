'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Product } from '../../lib/types'
import Cookies from 'js-cookie'

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const cartCookie = Cookies.get('cartItems')
    if (cartCookie) {
      const savedItems: { id: number; quantity: number }[] = JSON.parse(cartCookie)
      Promise.all(
        savedItems.map(item =>
          fetch(`https://loja-3bvt.onrender.com/products/${item.id}`)
            .then(res => res.json())
            .then(product => ({ ...product, quantity: item.quantity }))
            .catch(() => null)
        )
      ).then(products => {
        const loadedCart = products.filter(Boolean) as CartItem[]
        setCart(loadedCart)
      })
    }
  }, [])

  useEffect(() => {
    const cookieCart = cart.map(item => ({ id: item.id, quantity: item.quantity }))
    Cookies.set('cartItems', JSON.stringify(cookieCart), { expires: 7 })
  }, [cart])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      } else {
        return [...prev, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
    Cookies.remove('cartItems')
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
