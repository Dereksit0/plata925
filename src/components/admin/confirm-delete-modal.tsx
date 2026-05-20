'use client'

import { useEffect, useRef } from 'react'
import { Loader2, AlertTriangle } from 'lucide-react'

interface ConfirmDeleteModalProps {
  name: string
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export default function ConfirmDeleteModal({
  name,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDeleteModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onCancel()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [loading, onCancel])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !loading && onCancel()}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-[#E8E8E8] w-full max-w-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-bold text-[#1A1A1A] text-base leading-tight">
              ¿Eliminar este elemento?
            </h3>
            <p className="text-[#6B6B6B] text-sm mt-1.5 leading-relaxed">
              Se eliminará{' '}
              <span className="font-semibold text-[#1A1A1A]">"{name}"</span>{' '}
              de forma permanente. Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full border border-[#E8E8E8] text-sm font-semibold text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
