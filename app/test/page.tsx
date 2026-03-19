'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function TestPage() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function testConnection() {
      try {
        const { error } = await supabase.from('stories').select('count').limit(1)
        setConnected(!error)
      } catch (err) {
        setConnected(false)
      }
      setLoading(false)
    }
    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Setup Test</h1>
      
      <div className="space-y-2">
        <p className={connected ? 'text-green-600' : 'text-red-600'}>
          {loading ? '⏳ Testing...' : connected ? '✅ Supabase Connected!' : '❌ Connection failed'}
        </p>
        
        <p className="text-sage-600">
          ✅ Tailwind custom colors working
        </p>
        
        <p className="font-serif">
          ✅ Lora font working (serif)
        </p>
        
        <p className="font-sans">
          ✅ Inter font working (sans)
        </p>
      </div>
    </div>
  )
}