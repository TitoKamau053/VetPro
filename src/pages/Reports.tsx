import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockProducts, mockSales } from '@/data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function Reports() {
  const dailySales = mockSales.filter(s => s.date === '2026-11-15').reduce((sum, s) => sum + s.totalAmount, 0)
  const weeklySales = mockSales.reduce((sum, s) => sum + s.totalAmount, 0)
  const monthlySales = weeklySales * 4 // mock

  const salesChart = [
    { period: 'Week 1', sales: 45000 },
    { period: 'Week 2', sales: 52000 },
    { period: 'Week 3', sales: 48000 },
    { period: 'Week 4', sales: 61000 },
  ]

  const topProducts = mockProducts
    .map(p => ({
      name: p.name,
      units: Math.floor(Math.random() * 50) + 10,
      revenue: p.sellingPrice * (Math.floor(Math.random() * 50) + 10)
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  const lowStock = mockProducts.filter(p => p.status !== 'In Stock')
  const outOfStock = mockProducts.filter(p => p.status === 'Out of Stock')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Daily Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KES {dailySales.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">KES {weeklySales.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Monthly Sales (Est.)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {monthlySales.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Low Stock Items: {lowStock.length}</p>
            <p>Out of Stock: {outOfStock.length}</p>
            <ul className="mt-2 text-sm space-y-1">
              {lowStock.map(p => <li key={p.id}>• {p.name} ({p.quantity})</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Business KPIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>Revenue: KES {weeklySales.toLocaleString()}</div>
            <div>Stock Value: KES {mockProducts.reduce((s, p) => s + p.quantity * p.sellingPrice, 0).toLocaleString()}</div>
            <div>Inventory Turnover: 2.4x (mock)</div>
            <div>Best Product: {topProducts[0]?.name}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
