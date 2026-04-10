'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import LoginButton from './LoginButton'

export default function UserStatus() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // ดึงข้อมูล Credits จาก PostgreSQL
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(data)
      }
    }
    getUser()
  }, [])

  if (!user) return <LoginButton />

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <img src={profile?.avatar_url} className="w-10 h-10 rounded-full" alt="profile" />
      <div>
        <p className="font-bold">{profile?.display_name}</p>
        <p className="text-sm text-purple-600">สิทธิ์คงเหลือ: {profile?.credits} ครั้ง</p>
      </div>
      <button 
        onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
        className="ml-auto text-sm text-red-500 underline"
      >
        Logout
      </button>
    </div>
  )
}