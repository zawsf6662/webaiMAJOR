'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

export default function AuthTabs() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')


  useEffect(() => {
    const tab = searchParams.get('activeTab')
    if (tab === 'login' || tab === 'register') {
      setActiveTab(tab)
    }
  }, [searchParams])


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex bg-black/40 p-1 rounded-t-2xl border-x border-t border-emerald-900/30">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-xl ${
            activeTab === 'login' 
            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
            : "text-emerald-900 hover:text-emerald-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-xl ${
            activeTab === 'register' 
            ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
            : "text-emerald-900 hover:text-emerald-500"
          }`}
        >
          Register
        </button>
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-xl border border-emerald-900/30 p-8 rounded-b-2xl shadow-2xl">
        {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  )
}