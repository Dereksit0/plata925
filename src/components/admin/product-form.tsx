'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Type, Tag, ImageIcon, Boxes, type LucideIcon } from 'lucide-react'
import ImageUploader from './image-uploader'
import VariantManager from './variant-manager'
import {
  createProductAction,
  updateProductAction,
} from '@/app/admin/(protected)/catalog/actions'
import type { Collection, ProductWithVariants } from '@/types/admin'

const schema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  material: z.string().min(1),
  collection_id: z.string().optional(),
  is_active: z.boolean(),
  variants: z.array(
    z.object({
      id: z.string().optional(),
      variant_name: z.string().min(1, 'Escribe el nombre de la variante'),
      stock: z.number().int().min(0, 'Stock mínimo 0'),
    })
  ),
})

type ProductFormValues = z.infer<typeof schema>

interface ProductFormProps {
  collections: Pick<Collection, 'id' | 'name'>[]
  product?: ProductWithVariants
}

function SectionHeader({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

export default function ProductForm({ collections, product }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: Number(product?.price ?? 0),
      material: product?.material ?? 'Plata .925',
      collection_id: product?.collection_id ?? '',
      is_active: product?.is_active ?? true,
      variants:
        product?.product_variants?.map((v) => ({
          id: v.id,
          variant_name: v.variant_name,
          stock: Number(v.stock ?? 0),
        })) ?? [],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods

  const isActive = watch('is_active')

  const onSubmit = async (data: ProductFormValues) => {
    setSubmitting(true)
    const payload = {
      name: data.name,
      description: data.description ?? '',
      price: data.price,
      material: data.material,
      collection_id: data.collection_id || null,
      is_active: data.is_active,
      images,
      variants: data.variants,
    }

    const result = product
      ? await updateProductAction(product.id, payload)
      : await createProductAction(payload)

    if (result.error) {
      toast.error(result.error)
      setSubmitting(false)
      return
    }

    toast.success(product ? 'Joya actualizada' : 'Joya creada')
    router.push('/admin/catalog')
    router.refresh()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Section: Información básica */}
        <div>
          <SectionHeader icon={Type} label="Información básica" />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                placeholder="Ej: Aretes Circón Plata"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all placeholder-gray-400"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Descripción
                <span className="ml-1.5 text-xs font-normal text-gray-400">opcional</span>
              </label>
              <textarea
                {...register('description')}
                placeholder="Describe la joya: materiales, acabados, detalles..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all resize-none placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Section: Precio y detalles */}
        <div>
          <SectionHeader icon={Tag} label="Precio y detalles" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Precio (MXN) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs mt-1.5">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Material
              </label>
              <input
                {...register('material')}
                placeholder="Plata .925"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Colección
                <span className="ml-1.5 text-xs font-normal text-gray-400">opcional</span>
              </label>
              <select
                {...register('collection_id')}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-white"
              >
                <option value="">Sin colección</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Visibilidad
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => setValue('is_active', !isActive)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <span
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                    isActive ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      isActive ? 'translate-x-[18px]' : 'translate-x-0.5'
                    }`}
                  />
                </span>
                <span className="text-sm font-medium">
                  {isActive ? 'Visible en tienda' : 'Oculto en tienda'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section: Fotos */}
        <div>
          <SectionHeader icon={ImageIcon} label="Fotos del producto" />
          <ImageUploader
            value={images}
            onChange={setImages}
            multiple
            label=""
          />
        </div>

        {/* Section: Variantes */}
        <div>
          <SectionHeader icon={Boxes} label="Variantes y stock" />
          <VariantManager />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ED5082] hover:bg-[#D4407A] disabled:bg-[#ED5082]/40 text-white text-sm font-semibold rounded-full transition-colors shadow-md shadow-[#ED5082]/25"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {product ? 'Guardar cambios' : 'Crear joya'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
