import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function USSDSimulation() {
  const simulatedRequests = [
    { farmer: 'John Mwangi', phone: '+254712345678', request: '1. Product Inquiry - Antibiotics', time: '10:32 AM' },
    { farmer: 'Mary Akinyi', phone: '+254723456789', request: '2. Disease Reporting - Newcastle symptoms', time: '09:15 AM' },
    { farmer: 'Peter Ochieng', phone: '+254734567890', request: '3. Fertilizer Availability - NPK for maize', time: 'Yesterday' },
    { farmer: 'Grace Wanjiku', phone: '+254745678901', request: '4. Contact Veterinary Officer', time: 'Yesterday' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">USSD Integration Simulation</h1>
      <p className="text-muted-foreground">
        Future integration with Africa's Talking APIs for SMS and USSD. Currently simulated with mock data.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>USSD Menu Flow (*490#)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm space-y-1">
            <div>*490#</div>
            <div className="mt-2">1. Product Inquiry</div>
            <div>2. Disease Reporting</div>
            <div>3. Fertilizer Availability</div>
            <div>4. Contact Veterinary Officer</div>
            <div className="mt-2 text-yellow-400">Select an option:</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulated Farmer Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {simulatedRequests.map((req, i) => (
              <div key={i} className="p-3 border rounded flex justify-between items-start">
                <div>
                  <div className="font-medium">{req.farmer} ({req.phone})</div>
                  <div className="text-sm mt-1">{req.request}</div>
                </div>
                <div className="text-xs text-muted-foreground">{req.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported Channels (Future)</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1">
            <li>SMS via Africa's Talking</li>
            <li>USSD (*490#)</li>
            <li>Direct Messaging</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
