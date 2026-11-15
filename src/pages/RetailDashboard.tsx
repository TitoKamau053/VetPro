import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockProducts, mockSales } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function RetailDashboard() {
  const availableProducts = mockProducts.filter(p => p.quantity > 0).length
  const recentSales = mockSales.slice(0, 3)
  const lowStockAlerts = mockProducts.filter(p => p.status === 'Low Stock')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-800">Retail Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockAlerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentSales.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockAlerts.length > 0 ? (
              <ul className="space-y-2">
                {lowStockAlerts.map(p => (
                  <li key={p.id} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                    <span>{p.name}</span>
                    <span className="text-orange-600 font-medium">{p.quantity} left</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No low stock alerts</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/sales/new">
              <Button className="w-full">Record New Sale</Button>
            </Link>
            <Link to="/stock/receipt">
              <Button variant="outline" className="w-full">Record Stock Receipt</Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="w-full">View Product Catalog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentSales.map(sale => (
              <div key={sale.id} className="flex justify-between text-sm border-b pb-2">
                <span>{sale.transactionNumber}</span>
                <span className="font-medium">KES {sale.totalAmount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
