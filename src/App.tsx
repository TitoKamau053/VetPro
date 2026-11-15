import { useState, type ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import RetailDashboard from './pages/RetailDashboard'
import ProductManagement from './pages/ProductManagement'
import StockManagement from './pages/StockManagement'
import Sales from './pages/Sales'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import USSDSimulation from './pages/USSDSimulation'
import ProductCatalog from './pages/ProductCatalog'
import { Button } from './components/ui/button'

function Sidebar({ role, onLogout }: { role: 'admin' | 'retail', onLogout: () => void }) {
  const location = useLocation()
  
  const adminLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/products', label: 'Product Management' },
    { to: '/stock', label: 'Stock Management' },
    { to: '/sales', label: 'Sales' },
    { to: '/reports', label: 'Reports & Analytics' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/ussd', label: 'USSD Simulation' },
    { to: '/catalog', label: 'Product Catalog' },
  ]

  const retailLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/stock', label: 'Stock Management' },
    { to: '/sales', label: 'Sales' },
    { to: '/catalog', label: 'Product Catalog' },
  ]

  const links = role === 'admin' ? adminLinks : retailLinks

  return (
    <div className="w-64 bg-green-800 text-white min-h-screen p-4 flex flex-col">
      <div className="text-xl font-bold mb-8">VetShop Pro</div>
      <nav className="flex-1 space-y-1">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-4 py-2 rounded hover:bg-green-700 ${location.pathname === link.to ? 'bg-green-700' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button variant="outline" className="mt-4 text-green-800 border-white" onClick={onLogout}>
        Logout
      </Button>
    </div>
  )
}

function Layout({ role, onLogout, children }: { role: 'admin' | 'retail', onLogout: () => void, children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar role={role} onLogout={onLogout} />
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState<'admin' | 'retail' | null>(null)

  if (!role) {
    return <Login onLogin={setRole} />
  }

  return (
    <Router>
      <Layout role={role} onLogout={() => setRole(null)}>
        <Routes>
          <Route path="/dashboard" element={role === 'admin' ? <AdminDashboard /> : <RetailDashboard />} />
          <Route path="/products" element={role === 'admin' ? <ProductManagement /> : <Navigate to="/dashboard" />} />
          <Route path="/stock" element={<StockManagement />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/new" element={<Sales />} />
          <Route path="/reports" element={role === 'admin' ? <Reports /> : <Navigate to="/dashboard" />} />
          <Route path="/notifications" element={role === 'admin' ? <Notifications /> : <Navigate to="/dashboard" />} />
          <Route path="/ussd" element={role === 'admin' ? <USSDSimulation /> : <Navigate to="/dashboard" />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  )
}
