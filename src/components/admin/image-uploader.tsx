'use client'

import { useId, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, Camera } from 'lucide-react'
import { toast } from 'sonner'

const MAX_MB = 5
const MAX_BYTES = MAX_MB * 1024 * 1024

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
  multiple?: boolean
  label?: string
}

export default function ImageUploader({
  value,
  onChange,
  multiple = false,
  label = 'Imagen',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputId = useId()
  const cameraId = useId()

  async function uploadFiles(files: File[]) {
    if (!files.length) return

    const oversized = files.filter((f) => f.size > MAX_BYTES)
    if (oversized.length > 0) {
      toast.error(
        `${oversized.length === 1 ? 'Una imagen supera' : `${oversized.length} imágenes superan`} el límite de ${MAX_MB}MB. Comprime antes de subir.`
      )
      return
    }

    setUploading(true)
    const supabase = createClient()
    const newUrls: string[] = []

    for (const file of files) {
      const ext = file.name.split('.').pop() ?? 'jpg'
      const fileName = `${crypto.randomUUID()}.${ext}`

      const { error } = await supabase.storage
        .from('jewelry-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

      if (error) {
        toast.error(`Error al subir ${file.name}`)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('jewelry-images')
        .getPublicUrl(fileName)

      newUrls.push(publicUrl)
    }

    if (newUrls.length > 0) {
      onChange(multiple ? [...value, ...newUrls] : [newUrls[0]])
      toast.success(newUrls.length === 1 ? 'Imagen subida' : `${newUrls.length} imágenes subidas`)
    }

    setUploading(false)
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    await uploadFiles(files)
    e.target.value = ''
  }

  async function removeImage(url: string) {
    const supabase = createClient()
    const fileName = url.split('/').pop()
    if (fileName) {
      await supabase.storage.from('jewelry-images').remove([fileName])
    }
    onChange(value.filter((u) => u !== url))
  }

  const images = multiple ? value : value.slice(0, 1)
  const canUploadMore = multiple || images.length === 0

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-semibold text-[#1A1A1A]">{label}</label>
      )}

      {images.length > 0 && (
        <div className={`grid gap-3 ${multiple ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-1 max-w-[180px]'}`}>
          {images.map((url, idx) => (
            <div
              key={url}
              className="relative group aspect-square rounded-xl overflow-hidden bg-[#FAFAFA] border border-[#E8E8E8]"
            >
              {idx === 0 && multiple && (
                <div className="absolute top-1.5 left-1.5 z-10 bg-[#ED5082] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none pointer-events-none">
                  PRINCIPAL
                </div>
              )}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                aria-label="Eliminar imagen"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {canUploadMore && (
        <div className="flex flex-wrap gap-2">
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor={inputId}
            className={`inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#E8E8E8] rounded-xl text-sm text-[#6B6B6B] hover:border-[#ED5082] hover:text-[#ED5082] cursor-pointer transition-colors select-none bg-[#FAFAFA] ${
              uploading ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Subir {multiple ? 'imágenes' : 'imagen'}
              </>
            )}
          </label>

          <input
            id={cameraId}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor={cameraId}
            className={`inline-flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#E8E8E8] rounded-xl text-sm text-[#6B6B6B] hover:border-[#ED5082] hover:text-[#ED5082] cursor-pointer transition-colors select-none bg-[#FAFAFA] ${
              uploading ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            <Camera className="w-4 h-4" />
            Cámara
          </label>
        </div>
      )}

      <p className="text-xs text-[#6B6B6B]/60">
        Máx. {MAX_MB}MB por imagen · JPG, PNG, WebP, AVIF
        {multiple && images.length > 0 && ' · La primera imagen es la principal'}
      </p>
    </div>
  )
}
