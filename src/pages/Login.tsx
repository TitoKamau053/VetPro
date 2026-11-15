import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface LoginProps {
  onLogin: (role: 'admin' | 'retail') => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (role: 'admin' | 'retail') => {
    // Simulate login - no real auth
    onLogin(role)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700">VetShop Pro</CardTitle>
          <CardDescription>Veterinary Shop Management System</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
            />
          </div>
          <div className="space-y-2 pt-4">
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleSubmit('admin')}>
              Login as Admin
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleSubmit('retail')}>
              Login as Retail Staff
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            Prototype mode - No authentication required. Click a role to proceed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
