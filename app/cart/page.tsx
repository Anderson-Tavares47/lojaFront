'use client'

import { useCart } from "../context/CartContext"
import Header from "../../components/HeaderDetails"
import { useState } from "react"
import { calculateFrete } from "../../lib/calculateFrete"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [cep, setCep] = useState('')
  const [frete, setFrete] = useState<any[] | null>(null)

  const total = cart
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const toggleSelect = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  const handleCalculateShipping = async () => {
    try {
      const data = await calculateFrete(cep)
      setFrete(data)
    } catch (error) {
      console.error('Erro ao calcular frete:', error)
    }
  }

  const selectedFrete = frete ? (() => {
    const pacOption = frete.find(option => option.name === 'PAC' && option.price)
    const sedexOption = frete.find(option => option.name === 'SEDEX' && option.price)
    return pacOption || sedexOption
  })() : null

  const freteValue = selectedFrete ? parseFloat(selectedFrete.price) : 0
  const totalComFrete = selectedItems.length > 0 ? total + freteValue : total

  const isCepValid = cep.replace(/\D/g, '').length >= 8

  return (
    <>
      <Header />

      <main className="max-w-[800px] min-h-[705px] w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Carrinho 🛒</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-2xl">😢</p>
            <p className="mt-2">Seu carrinho está vazio</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="border rounded p-4 shadow flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-5 h-5"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-gray-600">R$ {item.price.toFixed(2)} x</p>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-16 p-1 border border-gray-300 bg-gray-100 text-gray-700 rounded text-center"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="text-right mt-4">
              <p className="text-lg font-semibold">
                Total: R$ {totalComFrete.toFixed(2)}
              </p>
            </div>

            {/* ✅ Input e botão de CEP alinhados à direita */}
            <div className="flex justify-end gap-2 items-center mt-4">
              <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                value={cep}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, '')
                  setCep(numericValue)
                }}
                placeholder="Digite seu CEP"
                className="border rounded bg-gray-100 text-gray-700 p-2 w-[150px]"
              />

              <button
                onClick={handleCalculateShipping}
                disabled={!isCepValid}
                className={`px-4 py-2 rounded transition ${isCepValid
                  ? 'bg-[#17686f] text-white hover:bg-[#117f7c]'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  }`}
              >
                Calcular Frete
              </button>
            </div>

            {/* ✅ Exibição do resultado do frete */}
            {selectedFrete && (
              <div className="mt-4 p-4 border rounded bg-gray-100">
                <h3 className="font-semibold mb-2">
                  Opção de Frete ({selectedFrete.name})
                </h3>
                <p>
                  Serviço: {selectedFrete.name} —
                  Valor: <strong>{selectedFrete.currency} {selectedFrete.price}</strong> —
                  Prazo: Em até {selectedFrete.delivery_time} dias
                </p>
              </div>
            )}

            <div className="flex justify-between items-center gap-4 mt-6">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-[#17686f] text-white rounded hover:bg-[#117f7c] transition sm:w-auto"
              >
                Voltar
              </button>

              <button
                className={`px-6 py-3 rounded transition text-center ${selectedItems.length === 0
                  ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                  : 'bg-[#17686f] hover:bg-[#117f7c] text-white'
                  }`}
                disabled={selectedItems.length === 0}
                onClick={() => {
                  const selectedProducts = cart.filter(item => selectedItems.includes(item.id))

                  const productsText = selectedProducts.map(item => (
                    `• ${item.name} - Quantidade: ${item.quantity}`
                  )).join('\n')

                  const freteText = selectedFrete
                    ? `\nFrete: ${selectedFrete.name} - ${selectedFrete.currency} ${selectedFrete.price}`
                    : ''

                  const message = `Olá, gostaria de finalizar minha compra com os seguintes itens:\n\n${productsText}\n\nTotal: R$ ${totalComFrete.toFixed(2)}${freteText}`

                  const whatsappNumber = '5551995936074'

                  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

                  window.open(whatsappLink, '_blank')
                }}
              >
                Fazer Pedido
              </button>
            </div>


          </div>
        )}
      </main>
    </>
  )
}
