'use client'
import { Sparkles, CreditCard, LogIn, UserPlus, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setProfile(null)
        router.push('/login')
    }

    useEffect(() => {
        const getProfile = async () => {
            setLoading
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)

                const { data, error } = await supabase
                    .from('profiles')
                    .select('display_name, credits')
                    .eq('id', user.id)
                    .single()

                if (data) {
                    setProfile(data)

                }
            }
            setLoading(false)
        }

        getProfile();
    }, [])

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-emerald-900/30 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* Logo - MysticAI Green Theme */}
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div className="bg-emerald-600 p-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        <Sparkles className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-emerald-500 uppercase">
                        Mystic<span className="text-white">AI</span>
                    </span>
                </div>

                {/* Right Side Items */}
                <div className="flex items-center gap-4 md:gap-8">

                    {/* Promotion Tag */}
                    <div className="hidden sm:flex items-center gap-2 bg-emerald-950/30 border border-emerald-500/20 px-4 py-1.5 rounded-full">
                        <CreditCard className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-200 tracking-widest uppercase">
                            49.- / 3 Rounds
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {loading ? (
                    <div className="w-20 h-8 bg-zinc-800 animate-pulse rounded-full" />
                ) : !user ? (
                    <>
                        <Link
                                    href="/login?activeTab=login"
                                    className="text-xs font-bold text-emerald-500 hover:text-white transition-colors px-4 py-2 uppercase tracking-widest"
                                >
                                    Login
                                </Link>


                                <Link
                                    href="/login?activeTab=register"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black px-5 py-2.5 rounded-full uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                >
                                    Register
                                </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-zinc-900/80 p-1 pr-4 rounded-full border border-emerald-900/30">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                                        {profile?.display_name?.[0].toUpperCase() || "?"}
                                    </div>
                                    <span className="text-xs font-bold text-emerald-100 hidden md:block">{profile?.display_name || "Guest"}</span>
                                    <span className="text-[9px] text-emerald-500 font-mono hidden md:block tracking-tighter">
                                        CR: {profile?.credits ?? 0}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-emerald-900 hover:text-red-500 transition-colors"
                                    title="ออกจากระบบ"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                )}
                    </div>

                </div>
            </div>
        </nav>
    )
}