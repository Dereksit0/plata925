'use client'

import { Plus, Trash2, AlertTriangle } from 'lucide-react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

export default function VariantManager() {
  const { control, register } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'variants' })

  const variants = (useWatch({ control, name: 'variants' }) as { variant_name: string; stock: number }[]) ?? []
  const totalStock = variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#1A1A1A]">Tallas, Medidas y Stock</h3>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Ej: &quot;Talla 7&quot;, &quot;45 cm&quot;, &quot;Unitalla&quot;
          </p>
        </div>
        <button
          type="button"
          onClick={() => append({ variant_name: '', stock: 0 })}
          className="flex items-center gap-1.5 text-sm font-semibold text-[#ED5082] hover:text-[#D4407A] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="border-2 border-dashed border-[#E8E8E8] rounded-xl py-8 text-center">
          <p className="text-sm text-[#6B6B6B]">Sin variantes aún.</p>
          <button
            type="button"
            onClick={() => append({ variant_name: '', stock: 0 })}
            className="mt-2 text-sm font-semibold text-[#ED5082] hover:text-[#D4407A] transition-colors"
          >
            + Agregar primera variante
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_96px_36px] gap-2 px-1">
              <span className="text-xs font-semibold text-[#6B6B6B]">Variante</span>
              <span className="text-xs font-semibold text-[#6B6B6B]">Stock</span>
              <span />
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-[1fr_96px_36px] gap-2 items-center">
                <input
                  {...register(`variants.${index}.variant_name`)}
                  placeholder='"Talla 7", "45 cm"...'
                  className="px-3 py-2 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-[#FAFAFA] placeholder-[#6B6B6B]/50"
                />
                <input
                  type="number"
                  {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                  placeholder="0"
                  min="0"
                  className="px-3 py-2 rounded-xl border border-[#E8E8E8] text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#ED5082] focus:border-transparent transition-all bg-[#FAFAFA]"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex items-center justify-center h-9 w-9 rounded-lg text-[#6B6B6B] hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Eliminar variante"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Total stock indicator */}
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm ${
            totalStock === 0
              ? 'bg-red-50 border border-red-100'
              : 'bg-[#FAFAFA] border border-[#E8E8E8]'
          }`}>
            {totalStock === 0 && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />}
            <span className={`font-medium ${totalStock === 0 ? 'text-red-600' : 'text-[#6B6B6B]'}`}>
              Stock total:
            </span>
            <span className={`font-bold ${totalStock === 0 ? 'text-red-600' : 'text-[#1A1A1A]'}`}>
              {totalStock} {totalStock === 1 ? 'pieza' : 'piezas'}
            </span>
            {totalStock === 0 && (
              <span className="text-red-500 text-xs ml-1 hidden sm:inline">
                — el producto no aparecerá disponible en el sitio
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
