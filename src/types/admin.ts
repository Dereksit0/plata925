export interface Collection {
  id: string
  name: string
  slug: string | null
  description: string | null
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  material: string
  collection_id: string | null
  images: string[]
  is_active: boolean
  created_at: string
  collections?: { name: string } | null
}

export interface ProductVariant {
  id: string
  product_id: string
  variant_name: string
  stock: number
}

export interface ProductWithVariants extends Product {
  product_variants: ProductVariant[]
}
