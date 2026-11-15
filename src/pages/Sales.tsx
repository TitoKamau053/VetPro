import { useState } from 'react'
import { mockProducts, mockSales, type Sale } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Sales() {
  const [sales, setSales] = useState(mockSales)
  const [cart, setCart] = useState<{productId: string; name: string; quantity: number; price: number}[]>([])
  const [search, setSearch] = useState('')

  const availableProducts = mockProducts.filter(p => p.quantity > 0 && p.name.toLowerCase().includes(search.toLowerCase()))

  const addToCart = (product: typeof mockProducts[0]) => {
    const existing = cart.find(i => i.productId === product.id)
    if (existing) {
      setCart(cart.map(i => i.productId === product.id ? {...i, quantity: i.quantity + 1} : i))
    } else {
      setCart([...cart, { productId: product.id, name: product.name, quantity: 1, price: product.sellingPrice }])
    }
  }

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart(cart.filter(i => i.productId !== productId))
    } else {
      setCart(cart.map(i => i.productId === productId ? {...i, quantity: qty} : i))
    }
  }

  const total = cart.reduce((sum, i) => sum + (i.quantity * i.price), 0)

  const completeSale = () => {
    if (cart.length === 0) return
    const newSale: Sale = {
      id: Date.now().toString(),
      transactionNumber: `TXN-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${sales.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      products: cart,
      totalAmount: total,
      staff: 'Retail Staff'
    }
    setSales([newSale, ...sales])
    setCart([])
    alert(`Sale completed! Transaction: ${newSale.transactionNumber}\nTotal: KES ${total.toLocaleString()}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Sales Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>New Sale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <div className="max-h-60 overflow-y-auto space-y-2">
              {availableProducts.map(p => (
                <div key={p.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-muted-foreground">KES {p.sellingPrice} | Stock: {p.quantity}</div>
                  </div>
                  <Button size="sm" onClick={() => addToCart(p)}>Add</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cart / Receipt Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {cart.map(item => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={e => updateQty(item.productId, Number(e.target.value))}
                          className="w-16 border rounded px-1"
                          min="1"
                        />
                        <span>KES {(item.quantity * item.price).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 font-bold text-lg">
                  Total: KES {total.toLocaleString()}
                </div>
                <Button className="w-full mt-4" onClick={completeSale}>Complete Sale</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border p-2">Transaction</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Products</th>
                  <th className="border p-2 text-right">Amount</th>
                  <th className="border p-2">Staff</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(s => (
                  <tr key={s.id}>
                    <td className="border p-2">{s.transactionNumber}</td>
                    <td className="border p-2">{s.date}</td>
                    <td className="border p-2">{s.products.map(p => `${p.name} x${p.quantity}`).join(', ')}</td>
                    <td className="border p-2 text-right">KES {s.totalAmount.toLocaleString()}</td>
                    <td className="border p-2">{s.staff}</td>
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
