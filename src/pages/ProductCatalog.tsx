import { useState } from 'react'
import { mockProducts, categories } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'

export default function ProductCatalog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [availability, setAvailability] = useState('All')

  const filtered = mockProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || p.category === category
    const matchAvail = availability === 'All' || 
      (availability === 'In Stock' && p.status === 'In Stock') ||
      (availability === 'Available' && p.quantity > 0)
    return matchSearch && matchCat && matchAvail
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Product Catalogue</h1>

      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded-md flex-1 min-w-[200px]"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 border rounded-md">
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={availability} onChange={e => setAvailability(e.target.value)} className="px-3 py-2 border rounded-md">
          <option value="All">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Available">Available</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(p => (
          <Card key={p.id} className="overflow-hidden">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{p.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold text-green-700">KES {p.sellingPrice.toLocaleString()}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  p.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                  p.status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>{p.status}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">Qty: {p.quantity} {p.unitType}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted-foreground">No products found</p>}
    </div>
  )
}
