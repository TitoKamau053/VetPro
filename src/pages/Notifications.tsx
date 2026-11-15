import { useState } from 'react'
import { mockMessages, type Message } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Notifications() {
  const [messages, setMessages] = useState(mockMessages)
  const [selected, setSelected] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')

  const markAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: 'Read' as const } : m))
  }

  const sendReply = () => {
    if (!selected || !replyText.trim()) return
    const updated: Message = {
      ...selected,
      status: 'Replied',
      replies: [...(selected.replies || []), { from: 'Admin', text: replyText, date: new Date().toISOString() }]
    }
    setMessages(messages.map(m => m.id === selected.id ? updated : m))
    setSelected(updated)
    setReplyText('')
  }

  const archive = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: 'Archived' as const } : m))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Farmer Communication & Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Received Farmer Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.filter(m => m.status !== 'Archived').map(m => (
                <div 
                  key={m.id} 
                  className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${m.status === 'Unread' ? 'bg-blue-50 border-blue-200' : ''}`}
                  onClick={() => { setSelected(m); if (m.status === 'Unread') markAsRead(m.id); }}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{m.farmerName}</span>
                    <span className={`text-xs px-2 py-1 rounded ${m.status === 'Unread' ? 'bg-red-100' : 'bg-gray-100'}`}>{m.status}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{m.phoneNumber}</div>
                  <div className="text-sm mt-1 line-clamp-2">{m.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{new Date(m.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selected ? (
              <div className="space-y-4">
                <div>
                  <div className="font-bold">{selected.farmerName}</div>
                  <div className="text-sm text-muted-foreground">{selected.phoneNumber}</div>
                  <div className="mt-2 p-3 bg-gray-50 rounded">{selected.message}</div>
                </div>
                {selected.replies && selected.replies.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Conversation History</div>
                    {selected.replies.map((r, i) => (
                      <div key={i} className="p-2 bg-green-50 rounded text-sm">
                        <div className="font-medium">{r.from}</div>
                        <div>{r.text}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <textarea
                    className="w-full border rounded p-2"
                    rows={3}
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={sendReply}>Send Reply</Button>
                    <Button variant="outline" onClick={() => archive(selected.id)}>Archive</Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Select a message to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
