'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { deleteProductAction } from '@/app/admin/(protected)/catalog/actions'
import ConfirmDeleteModal from './confirm-delete-modal'

export default function DeleteProductButton({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setDeleting(true)
    const result = await deleteProductAction(id)
    if (result.error) {
      toast.error(result.error)
      setDeleting(false)
      setOpen(false)
      return
    }
    toast.success(`"${name}" eliminada`)
    router.refresh()
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label={`Eliminar ${name}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {open && (
        <ConfirmDeleteModal
          name={name}
          onConfirm={handleDelete}
          onCancel={() => !deleting && setOpen(false)}
          loading={deleting}
        />
      )}
    </>
  )
}
