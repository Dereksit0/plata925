-- ============================================================
-- PLATA925 · Schema de base de datos
-- Ejecutar PRIMERO en Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. COLECCIONES ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS collections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE,
  description TEXT,
  image_url   TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 2. PRODUCTOS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE,
  description   TEXT,
  price         NUMERIC(10,2) NOT NULL DEFAULT 0,
  material      TEXT,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  images        TEXT[] NOT NULL DEFAULT '{}',
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 3. VARIANTES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_variants (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id   UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_name TEXT NOT NULL DEFAULT 'Unitalla',
  stock        INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── 4. ÍNDICES ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_collection_id ON products(collection_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);

-- ── 5. ROW LEVEL SECURITY (RLS) ──────────────────────────────
-- Lectura pública (sitio web)
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede leer
CREATE POLICY "public_read_collections"   ON collections   FOR SELECT USING (true);
CREATE POLICY "public_read_products"      ON products      FOR SELECT USING (true);
CREATE POLICY "public_read_variants"      ON product_variants FOR SELECT USING (true);

-- Política: solo usuarios autenticados (admin) pueden escribir
CREATE POLICY "auth_write_collections"   ON collections   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_products"      ON products      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_variants"      ON product_variants FOR ALL USING (auth.role() = 'authenticated');
