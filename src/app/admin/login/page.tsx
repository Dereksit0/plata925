'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Lock, User, Eye, EyeOff, Gem } from 'lucide-react'

const ADMIN_DOMAIN = '@admin.plata'

export default function LoginPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const email = userId.trim().toLowerCase() + ADMIN_DOMAIN
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error('ID o contraseña incorrectos.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ED5082] mb-5 shadow-lg shadow-[#ED5082]/30">
            <Gem className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
            PLATA<span className="text-[#ED5082]">925</span>
          </h1>
          <p className="text-[#6B6B6B] text-sm mt-1.5">Joyería en Plata .925</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E8E8E8] p-7">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
            Acceso al panel
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                ID de usuario
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ED5082]/60" />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Tu ID de acceso"
                  required
                  autoComplete="username"
                  autoCapitalize="none"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-[#FAFAFA] placeholder-[#6B6B6B]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ED5082]/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-[#FAFAFA]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#ED5082] transition-colors"
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#ED5082] hover:bg-[#D4407A] disabled:bg-[#ED5082]/50 text-white font-semibold rounded-full transition-all duration-200 mt-2 shadow-md hover:shadow-lg hover:shadow-[#ED5082]/25 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando...
                </>
              ) : (
                'Entrar al panel'
              )}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E8E8E8]">
            <p className="text-xs text-[#6B6B6B] text-center">
              Acceso restringido · Solo personal autorizado
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-[#6B6B6B]/60 mt-6">
          PLATA925 · Joyería en plata .925
        </p>
      </div>
    </div>
  )
}
