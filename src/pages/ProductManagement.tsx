import { useState } from 'react'
import { mockProducts, categories, type Product } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filtered = products.filter(p => 
    (filterCategory === 'All' || p.category === filterCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleSave = (product: Omit<Product, 'id' | 'status'> & { id?: string }) => {
    const status: Product['status'] = product.quantity === 0 ? 'Out of Stock' : product.quantity < 15 ? 'Low Stock' : 'In Stock'
    if (product.id) {
      setProducts(products.map(p => p.id === product.id ? { ...p, ...product, status } : p))
    } else {
      setProducts([...products, { ...product, id: Date.now().toString(), status }])
    }
    setShowAddForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-800">Product Management</h1>
        <Button onClick={() => { setEditingProduct(null); setShowAddForm(true); }}>Add Product</Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md flex-1 min-w-[200px]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-green-50">
              <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">SKU</th>
              <th className="border p-2 text-right">Qty</th>
              <th className="border p-2 text-right">Buy Price</th>
              <th className="border p-2 text-right">Sell Price</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">{p.sku}</td>
                <td className="border p-2 text-right">{p.quantity}</td>
                <td className="border p-2 text-right">{p.buyingPrice}</td>
                <td className="border p-2 text-right">{p.sellingPrice}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    p.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                    p.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="border p-2 text-center space-x-1">
                  <Button size="sm" variant="outline" onClick={() => { setEditingProduct(p); setShowAddForm(true); }}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <ProductForm 
          product={editingProduct} 
          onSave={handleSave} 
          onCancel={() => { setShowAddForm(false); setEditingProduct(null); }} 
        />
      )}
    </div>
  )
}

function ProductForm({ product, onSave, onCancel }: { product: Product | null, onSave: (p: any) => void, onCancel: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    category: product?.category || categories[0],
    description: product?.description || '',
    unitType: product?.unitType || '',
    buyingPrice: product?.buyingPrice || 0,
    sellingPrice: product?.sellingPrice || 0,
    quantity: product?.quantity || 0,
    expiryDate: product?.expiryDate || '',
    supplier: product?.supplier || '',
    image: product?.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    sku: product?.sku || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...form, id: product?.id })
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input className="w-full border rounded px-3 py-2" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select className="w-full border rounded px-3 py-2" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea className="w-full border rounded px-3 py-2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Unit Type</label>
            <input className="w-full border rounded px-3 py-2" value={form.unitType} onChange={e => setForm({...form, unitType: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">SKU</label>
            <input className="w-full border rounded px-3 py-2" value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Buying Price</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={form.buyingPrice} onChange={e => setForm({...form, buyingPrice: Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Selling Price</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Initial Quantity</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={form.quantity} onChange={e => setForm({...form, quantity: Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input type="date" className="w-full border rounded px-3 py-2" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Supplier</label>
            <input className="w-full border rounded px-3 py-2" value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Image URL</label>
            <input className="w-full border rounded px-3 py-2" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
