'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else window.location.reload()
    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Email Address</label>
        <input 
          type="email" 
          className="w-full bg-black/50 border border-emerald-900/50 p-3 rounded-xl focus:border-emerald-500 outline-none text-emerald-100 transition-all shadow-inner" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Password</label>
        <input 
          type="password" 
          className="w-full bg-black/50 border border-emerald-900/50 p-3 rounded-xl focus:border-emerald-500 outline-none text-emerald-100 transition-all shadow-inner" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button 
        disabled={loading}
        className="w-full bg-emerald-500 text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-emerald-400 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Access Oracle'}
      </button>
    </form>
  )
}