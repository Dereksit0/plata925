'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Type, Image, Link2, CheckCircle2, AlertCircle } from 'lucide-react'
import ImageUploader from './image-uploader'
import {
  createCollectionAction,
  updateCollectionAction,
} from '@/app/admin/(protected)/collections/actions'
import { toSlug } from '@/lib/slug'
import type { Collection } from '@/types/admin'

const VALID_SLUGS = ['aretes', 'anillos', 'dijes', 'pulseras', 'arracadas', 'cadenas', 'esclavas']

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function CollectionForm({
  collection,
}: {
  collection?: Collection
}) {
  const [imageUrls, setImageUrls] = useState<string[]>(
    collection?.image_url ? [collection.image_url] : []
  )
  const [submitting, setSubmitting] = useState(false)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!collection?.slug)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      slug: collection?.slug ?? '',
      description: collection?.description ?? '',
    },
  })

  const nameValue = watch('name')
  const slugValue = watch('slug')
  const isValidSlug = VALID_SLUGS.includes(slugValue)

  // Auto-fill slug from name unless the user has manually edited it
  useEffect(() => {
    if (!slugManuallyEdited && nameValue) {
      setValue('slug', toSlug(nameValue), { shouldValidate: true })
    }
  }, [nameValue, slugManuallyEdited, setValue])

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    const payload = {
      name: data.name,
      slug: data.slug,
      description: data.description ?? '',
      image_url: imageUrls[0] ?? '',
    }

    const result = collection
      ? await updateCollectionAction(collection.id, payload)
      : await createCollectionAction(payload)

    if (result.error) {
      toast.error(result.error)
      setSubmitting(false)
      return
    }

    toast.success(collection ? 'Colección actualizada' : 'Colección creada')
    router.push('/admin/collections')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

      {/* Section: Información */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E8E8]">
          <Type className="w-4 h-4 text-[#6B6B6B]" />
          <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest">
            Información
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              Nombre <span className="text-[#ED5082]">*</span>
            </label>
            <input
              {...register('name')}
              placeholder="Ej: Aretes, Anillos, Cadenas..."
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all placeholder-[#6B6B6B]/50 bg-[#FAFAFA]"
            />
            {errors.name && (
              <p className="text-[#ED5082] text-xs mt-1.5">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
              Descripción
              <span className="ml-1.5 text-xs font-normal text-[#6B6B6B]">opcional</span>
            </label>
            <textarea
              {...register('description')}
              placeholder="Describe brevemente esta colección..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all resize-none placeholder-[#6B6B6B]/50 bg-[#FAFAFA]"
            />
          </div>
        </div>
      </div>

      {/* Section: Slug */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E8E8]">
          <Link2 className="w-4 h-4 text-[#6B6B6B]" />
          <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest">
            URL de categoría
          </span>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
            Slug <span className="text-[#ED5082]">*</span>
          </label>

          <div className="relative">
            <input
              {...register('slug')}
              placeholder="aretes"
              onChange={(e) => {
                setSlugManuallyEdited(true)
                setValue('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''), {
                  shouldValidate: true,
                })
              }}
              className="w-full px-3 py-2.5 pr-10 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] font-mono focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-[#FAFAFA]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {slugValue && (
                isValidSlug
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  : <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>

          {errors.slug && (
            <p className="text-[#ED5082] text-xs mt-1.5">{errors.slug.message}</p>
          )}

          {/* Status message */}
          {slugValue && (
            <p className={`text-xs mt-2 flex items-center gap-1.5 ${isValidSlug ? 'text-emerald-600' : 'text-amber-600'}`}>
              {isValidSlug
                ? <><CheckCircle2 className="w-3.5 h-3.5" /> Este slug conecta con la categoría <strong>{slugValue}</strong> del sitio.</>
                : <>
                    <AlertCircle className="w-3.5 h-3.5" />
                    Los productos de esta colección no aparecerán en el sitio hasta que el slug coincida con una categoría.
                  </>
              }
            </p>
          )}

          {/* Valid slugs reference */}
          <div className="mt-3 p-3 rounded-xl bg-[#FAFAFA] border border-[#E8E8E8]">
            <p className="text-xs font-semibold text-[#6B6B6B] mb-2">
              Categorías disponibles en el sitio:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {VALID_SLUGS.map((slug) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => {
                    setValue('slug', slug, { shouldValidate: true })
                    setSlugManuallyEdited(true)
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    slugValue === slug
                      ? 'bg-[#ED5082] text-white'
                      : 'bg-white border border-[#E8E8E8] text-[#6B6B6B] hover:border-[#ED5082] hover:text-[#ED5082]'
                  }`}
                >
                  {slug}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section: Imagen */}
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E8E8]">
          <Image className="w-4 h-4 text-[#6B6B6B]" />
          <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-widest">
            Imagen de portada
          </span>
        </div>
        <ImageUploader
          value={imageUrls}
          onChange={setImageUrls}
          label=""
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t border-[#E8E8E8]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#E8E8E8] text-sm font-semibold text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ED5082] hover:bg-[#D4407A] disabled:bg-[#ED5082]/40 text-white text-sm font-semibold rounded-full transition-colors shadow-md shadow-[#ED5082]/25"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {collection ? 'Guardar cambios' : 'Crear colección'}
        </button>
      </div>
    </form>
  )
}
