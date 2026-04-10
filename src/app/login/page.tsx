'use client'
import AuthTabs from '@/components/AuthTabs'
import Navbar from '@/components/Navbar'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import LoginButton from '@/components/LoginButton'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                router.push('/')
            }
        }
        checkUser()
    }, [router, supabase])


  return (
    <div className="min-h-screen bg-[#050505] text-emerald-50 relative overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-900/10 blur-[120px] rounded-full" />
      
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 pt-20">
        {/* ปุ่มย้อนกลับ */}
        <Link 
          href="/" 
          className="mb-8 flex items-center gap-2 text-emerald-700 hover:text-emerald-400 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Oracle
        </Link>
        <div className="w-full max-w-md ">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
              Identify <span className="text-emerald-500">Yourself</span>
            </h2>
            <p className="text-emerald-900 text-xs mt-2 tracking-[0.2em]">ACCESSING_SECURE_GATEWAY...</p>
          </div>
          
          <LoginButton />
          
          <AuthTabs />
        </div>
      </main>
    </div>
  )
}