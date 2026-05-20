'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { toggleProductVisibilityAction } from '@/app/admin/(protected)/catalog/actions'

export default function ToggleProductButton({
  id,
  name,
  isActive,
}: {
  id: string
  name: string
  isActive: boolean
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    setLoading(true)
    const result = await toggleProductVisibilityAction(id, !isActive)
    if (result.error) {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success(isActive ? `"${name}" ocultada del sitio` : `"${name}" visible en el sitio`)
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
        isActive
          ? 'text-emerald-600 hover:bg-emerald-50'
          : 'text-[#6B6B6B]/40 hover:text-[#6B6B6B] hover:bg-[#F0F0F0]'
      }`}
      aria-label={isActive ? `Ocultar ${name}` : `Mostrar ${name}`}
      title={isActive ? 'Ocultar del sitio' : 'Mostrar en el sitio'}
    >
      {isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
    </button>
  )
}
