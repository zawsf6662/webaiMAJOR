'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from('fortune_history')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setHistory(data)
    }
    fetchHistory()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">บันทึกคำทำนายของคุณ</h1>
      <div className="grid gap-6">
        {history.map((item) => (
          <div key={item.id} className="border p-4 rounded-xl bg-white shadow-sm">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>{new Date(item.created_at).toLocaleDateString('th-TH')}</span>
              <span>ไพ่ {item.spread_type} ใบ</span>
            </div>
            <p className="font-semibold text-lg mb-2">Q: {item.question}</p>
            <div className="bg-purple-50 p-3 rounded-lg text-gray-700">
              {item.ai_response}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}