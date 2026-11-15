import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockProducts, mockSales, mockMessages } from '@/data/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

export default function AdminDashboard() {
  const totalProducts = mockProducts.length
  const lowStock = mockProducts.filter(p => p.status === 'Low Stock').length
  const soldToday = mockSales.filter(s => s.date === '2026-11-15').reduce((sum, s) => sum + s.products.reduce((a, p) => a + p.quantity, 0), 0)
  const inventoryValue = mockProducts.reduce((sum, p) => sum + (p.quantity * p.sellingPrice), 0)
  const messagesReceived = mockMessages.length

  const chartData = [
    { name: 'Mon', sales: 12000 },
    { name: 'Tue', sales: 19000 },
    { name: 'Wed', sales: 15000 },
    { name: 'Thu', sales: 22000 },
    { name: 'Fri', sales: 18000 },
    { name: 'Sat', sales: 25000 },
    { name: 'Sun', sales: 13000 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products Sold Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{soldToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KES {inventoryValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Farmer Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center py-8">{messagesReceived}</div>
            <p className="text-center text-muted-foreground">Messages received this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span>Stock received: Antibiotics (+20)</span>
              <span className="text-muted-foreground">Today</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>Sale recorded: TXN-20261115-001</span>
              <span className="text-muted-foreground">Today</span>
            </li>
            <li className="flex justify-between text-sm">
              <span>New farmer message from John Mwangi</span>
              <span className="text-muted-foreground">Today</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
