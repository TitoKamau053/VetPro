import { useState } from 'react'
import { mockProducts, mockStockMovements, type Product, type StockMovement } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function StockManagement() {
  const [products, setProducts] = useState(mockProducts)
  const [movements, setMovements] = useState(mockStockMovements)
  const [selectedProduct, setSelectedProduct] = useState('')
  const [qtyReceived, setQtyReceived] = useState(0)
  const [supplier, setSupplier] = useState('')

  const handleReceipt = () => {
    if (!selectedProduct || qtyReceived <= 0) return
    const product = products.find(p => p.id === selectedProduct)
    if (!product) return

    const newQty = product.quantity + qtyReceived
    const status: Product['status'] = newQty === 0 ? 'Out of Stock' : newQty < 15 ? 'Low Stock' : 'In Stock'
    
    setProducts(products.map(p => p.id === selectedProduct ? { ...p, quantity: newQty, status } : p))
    
    const newMovement: StockMovement = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      productId: selectedProduct,
      productName: product.name,
      quantity: qtyReceived,
      actionType: 'Stock In',
      user: 'Retail Staff'
    }
    setMovements([newMovement, ...movements])
    
    setSelectedProduct('')
    setQtyReceived(0)
    setSupplier('')
    alert('Stock received successfully!')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Stock Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Record Stock Receipt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Product</label>
            <select 
              className="w-full border rounded px-3 py-2" 
              value={selectedProduct} 
              onChange={e => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} (Current: {p.quantity})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity Received</label>
            <input type="number" className="w-full border rounded px-3 py-2" value={qtyReceived} onChange={e => setQtyReceived(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium">Supplier</label>
            <input className="w-full border rounded px-3 py-2" value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="Supplier name" />
          </div>
          <Button onClick={handleReceipt}>Record Receipt</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Movement History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Product</th>
                  <th className="border p-2 text-right">Qty</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">User</th>
                </tr>
              </thead>
              <tbody>
                {movements.map(m => (
                  <tr key={m.id}>
                    <td className="border p-2">{m.date}</td>
                    <td className="border p-2">{m.productName}</td>
                    <td className="border p-2 text-right">{m.quantity}</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-xs ${m.actionType === 'Stock In' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {m.actionType}
                      </span>
                    </td>
                    <td className="border p-2">{m.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
