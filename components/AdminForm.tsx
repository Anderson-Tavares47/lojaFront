'use client'

import { useEffect, useState, FormEvent } from 'react'

type Product = {
  id: string
  name: string
  price: number
  description: string
  image?: {
    url: string
  }
}

export default function AdminForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://loja-3bvt.onrender.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Erro ao buscar produtos', err))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!file && !editingProductId) {
      setFeedback('Selecione uma imagem!')
      return
    }

    try {
      let imageId = null

      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const imageRes = await fetch('https://loja-3bvt.onrender.com/upload', {
          method: 'POST',
          body: formData
        })

        const image = await imageRes.json()
        imageId = image.id
      }

      const numericPrice = parseFloat(price.replace(/\./g, '').replace(',', '.'))

      const payload: any = {
        name,
        price: numericPrice,
        description,
      }

      if (imageId) payload.imageId = imageId

      if (editingProductId) {
        await fetch(`https://loja-3bvt.onrender.com/products/${editingProductId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        setFeedback('Produto atualizado com sucesso!')
      } else {
        await fetch('https://loja-3bvt.onrender.com/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        setFeedback('Produto cadastrado com sucesso!')
      }

      setName('')
      setPrice('')
      setDescription('')
      setFile(null)
      setEditingProductId(null)

      const updated = await fetch('https://loja-3bvt.onrender.com/products').then(res => res.json())
      setProducts(updated)
    } catch (error) {
      console.error(error)
      setFeedback('Erro ao salvar produto!')
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/\D/g, '')
    const numericValue = (parseFloat(value) / 100).toFixed(2)

    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(numericValue))

    setPrice(formatted.replace('R$', '').trim())
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Tem certeza que deseja deletar este produto?')
    if (!confirmed) return

    try {
      await fetch(`https://loja-3bvt.onrender.com/products/${id}`, {
        method: 'DELETE',
      })
      setProducts(prev => prev.filter(product => product.id !== id))
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
    }
  }

  const handleEdit = (product: Product) => {
    setName(product.name)
    setPrice(product.price.toFixed(2).replace('.', ','))
    setDescription(product.description)
    setEditingProductId(product.id)
    setFile(null)
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <div className="flex items-center border p-2 rounded">
          <span className="mr-1">R$</span>
          <input
            type="text"
            placeholder="Preço"
            value={price}
            onChange={handlePriceChange}
            className="flex-1 outline-none bg-transparent"
          />
        </div>

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="cursor-pointer bg-[#17686f] text-white py-2 rounded hover:bg-[#117f7c] transition px-4">
          {file ? file.name : 'Selecionar Imagem'}
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="bg-[#17686f] text-white py-2 rounded hover:bg-[#117f7c] transition"
        >
          {editingProductId ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </button>

        {editingProductId && (
          <button
            type="button"
            onClick={() => {
              setEditingProductId(null)
              setName('')
              setPrice('')
              setDescription('')
              setFile(null)
            }}
            className="bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition mt-2"
          >
            Cancelar Edição
          </button>
        )}

        {feedback && (
          <div className="text-sm mt-2 text-gray-700">{feedback}</div>
        )}
      </form>

      {/* Lista de produtos */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Produtos cadastrados:</h2>
        <ul className="space-y-4">
          {products.map(product => (
            <li
              key={product.id}
              className="border p-3 rounded flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">R$ {product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-700">{product.description}</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
