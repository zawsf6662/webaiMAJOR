'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('') 
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { 
          full_name: displayName 
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setErrorMessage(error.message)
    } else {
      alert('สำเร็จ! กรุณาเช็คอีเมลเพื่อยืนยันการสมัคร')
      setEmail('')
      setPassword('')
      setDisplayName('')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      {/* --- เพิ่มช่องกรอกชื่อตรงนี้ --- */}
      <div className="space-y-2">
        <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Display Name</label>
        <input 
          value={displayName}
          type="text" 
          placeholder="ระบุชื่อเรียกของท่าน..."
          className="w-full bg-black/50 border border-emerald-900/50 p-3 rounded-xl focus:border-emerald-500 outline-none text-emerald-100 transition-all" 
          onChange={(e) => setDisplayName(e.target.value)} 
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Email Address</label>
        <input 
          value={email}
          type="email" 
          className="w-full bg-black/50 border border-emerald-900/50 p-3 rounded-xl focus:border-emerald-500 outline-none text-emerald-100 transition-all" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Secure Password</label>
        <input 
          value={password}
          type="password" 
          className="w-full bg-black/50 border border-emerald-900/50 p-3 rounded-xl focus:border-emerald-500 outline-none text-emerald-100 transition-all" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>

      {errorMessage && (
        <p className="text-red-500 text-xs font-bold">{errorMessage}</p>
      )}

      <button 
        disabled={loading}
        className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-emerald-100 active:scale-[0.98] transition-all disabled:opacity-50"
      >
        {loading ? 'Initializing...' : 'Create Account'}
      </button>
    </form>
  )
}