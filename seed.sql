-- ============================================================
-- PLATA925 · Seed inicial de colecciones y productos
-- Ejecutar UNA VEZ en Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. COLECCIONES ──────────────────────────────────────────
INSERT INTO collections (name, slug, description, image_url)
SELECT name, slug, description, image_url FROM (VALUES
  ('Aretes',    'aretes',    'Aretes en plata .925 certificada',    '/images/aretes/aretes1.png'),
  ('Anillos',   'anillos',   'Anillos en plata .925 certificada',   '/images/anillos/anillos1.png'),
  ('Dijes',     'dijes',     'Dijes en plata .925 certificada',     '/images/dijes/dije3.png'),
  ('Pulseras',  'pulseras',  'Pulseras en plata .925 certificada',  '/images/pulseras/pulsera1.png'),
  ('Arracadas', 'arracadas', 'Arracadas en plata .925 certificada', '/images/arracadas/arracadas1.png'),
  ('Cadenas',   'cadenas',   'Cadenas en plata .925 certificada',   '/images/cadena/cadena1.png'),
  ('Esclavas',  'esclavas',  'Esclavas en plata .925 certificada',  '/images/esclava/esclava1.png')
) AS t(name, slug, description, image_url)
WHERE NOT EXISTS (SELECT 1 FROM collections WHERE collections.slug = t.slug);

-- ── 2. PRODUCTOS ────────────────────────────────────────────
INSERT INTO products (name, slug, description, price, material, collection_id, images, is_active)
SELECT t.name, t.slug, t.description, t.price::numeric, t.material,
       (SELECT id FROM collections WHERE slug = t.cat_slug),
       t.images::text[], true
FROM (VALUES

  -- ANILLOS (17)
  ('Anillo Zirconias Corazón',    'anillo-zirconias-corazon',    'Talla 7. Diseño de corazón con zirconias brillantes en plata .925 certificada.',         0, 'Plata .925', 'anillos', '{/images/anillos/anillos1.png}'),
  ('Anillo Clásico .925',         'anillo-clasico-tallas',       'Disponible en talla 7 y 8. Diseño elegante en plata .925 pura certificada.',              0, 'Plata .925', 'anillos', '{/images/anillos/anillos2.png}'),
  ('Anillo con Zirconias',        'anillo-zirconias-elegante',   'Talla 7. Zirconias brillantes engastadas en plata .925 certificada.',                    0, 'Plata .925', 'anillos', '{/images/anillos/anillos3.png}'),
  ('Anillo Zirconias Multicolor', 'anillo-zirconias-multicolor', 'Talla 7. Zirconias de colores vibrantes en plata .925 pura. Único y llamativo.',         0, 'Plata .925', 'anillos', '{/images/anillos/anillo4.png}'),
  ('Anillo Plata .925',           'anillo-talla-8',              'Talla 8. Diseño refinado y elegante en plata .925 certificada.',                          0, 'Plata .925', 'anillos', '{/images/anillos/anillo5.png}'),
  ('Anillo Artesanal',            'anillo-diseno-artesanal',     'Pieza artesanal en plata .925 certificada. Diseño exclusivo hecho a mano.',               0, 'Plata .925', 'anillos', '{/images/anillos/anillo6.png}'),
  ('Anillo Zirconia Amatista',    'anillo-zirconia-amatista',    'Talla 7. Piedra zirconia amatista en plata .925. Elegancia y color en una sola pieza.',   0, 'Plata .925', 'anillos', '{/images/anillos/anillo7.png}'),
  ('Anillo Zirconias Fino',       'anillo-zirconias-talla-5',    'Talla 5. Delicado anillo con zirconias brillantes en plata .925 certificada.',            0, 'Plata .925', 'anillos', '{/images/anillos/anillo8.png}'),
  ('Anillo Zirconias Clásico',    'anillo-zirconias-clasico',    'Talla 7. Zirconias brillantes en montadura clásica de plata .925.',                      0, 'Plata .925', 'anillos', '{/images/anillos/anillo9.png}'),
  ('Anillo Versátil',             'anillo-versatil-tallas',      'Disponible en talla 6 y 8. Diseño versátil en plata .925 pura certificada.',              0, 'Plata .925', 'anillos', '{/images/anillos/anillo10.png}'),
  ('Anillo Exclusivo',            'anillo-exclusivo',            'Pieza exclusiva en plata .925 certificada. Diseño artesanal con acabado pulido.',         0, 'Plata .925', 'anillos', '{/images/anillos/anillo11.png}'),
  ('Anillo Amatista',             'anillo-amatista',             'Talla 7.5. Piedra amatista natural en plata .925 certificada. Elegancia natural.',        0, 'Plata .925', 'anillos', '{/images/anillos/anillo12.png}'),
  ('Anillo Zirconias Blancas',    'anillo-zirconias-blancas',    'Talla 10. Zirconias blancas brillantes en plata .925. Glamour y sofisticación.',          0, 'Plata .925', 'anillos', '{/images/anillos/anillo13.png}'),
  ('Anillo Clavo con Zirconias',  'anillo-clavo-zirconias',      'Talla 8. Diseño de clavo con zirconias brillantes en plata .925 certificada.',            0, 'Plata .925', 'anillos', '{/images/anillos/anillo14.png}'),
  ('Anillo Amatista Verde',       'anillo-amatista-verde',       'Talla 7.5. Zirconias y amatista verde en plata .925. Color y elegancia únicos.',          0, 'Plata .925', 'anillos', '{/images/anillos/anillo15.png}'),
  ('Anillo Anti-Estrés',          'anillo-anti-estres',          'Talla 10. Las bolitas giran libremente — el toque perfecto para reducir el estrés.',      0, 'Plata .925', 'anillos', '{/images/anillos/anillo16.png}'),
  ('Anillo Medio Dedo Corazón',   'anillo-medio-dedo-corazon',   'Anillo de corazón para medio dedo. Diseño único y delicado en plata .925 certificada.',   0, 'Plata .925', 'anillos', '{/images/anillos/anillo17.png}'),

  -- ARETES (15)
  ('Aretes Argolla Clásica', 'aretes-argolla-clasica', 'Aretes argolla en plata .925. Cierre de seguridad, livianas y cómodas para uso diario.', 0, 'Plata .925', 'aretes', '{/images/aretes/aretes1.png}'),
  ('Aretes Corazón',         'aretes-corazon',         'Aretes con corazón en plata .925. Diseño romántico, perfectos para regalar.',            0, 'Plata .925', 'aretes', '{/images/aretes/aretes2.png}'),
  ('Aretes Flor',            'aretes-flor',            'Aretes con diseño floral en plata .925. Delicados y elegantes, ideales para el día a día.', 0, 'Plata .925', 'aretes', '{/images/aretes/aretes3.png}'),
  ('Aretes Mariposa',        'aretes-mariposa',        'Aretes de mariposa en plata .925. Ligeros y vistosos, perfectos para primavera.',         0, 'Plata .925', 'aretes', '{/images/aretes/aretes4.png}'),
  ('Aretes Luna',            'aretes-luna',            'Aretes con media luna en plata .925. Diseño boho-chic con acabado brillante.',            0, 'Plata .925', 'aretes', '{/images/aretes/aretes5.png}'),
  ('Aretes Estrella',        'aretes-estrella',        'Aretes estrella en plata .925. Minimalistas y versátiles, van con todo.',                 0, 'Plata .925', 'aretes', '{/images/aretes/aretes6.png}'),
  ('Aretes Cruz',            'aretes-cruz',            'Aretes cruz en plata .925. Diseño clásico con significado espiritual.',                   0, 'Plata .925', 'aretes', '{/images/aretes/aretes7.png}'),
  ('Aretes Lágrima',         'aretes-lagrima',         'Aretes en forma de lágrima en plata .925. Colgantes elegantes para ocasiones especiales.', 0, 'Plata .925', 'aretes', '{/images/aretes/aretes8.png}'),
  ('Aretes Ojo Turco',       'aretes-ojo-turco',       'Aretes con ojo turco en plata .925. Protección y estilo en cada movimiento.',             0, 'Plata .925', 'aretes', '{/images/aretes/aretes9.png}'),
  ('Aretes Hoja',            'aretes-hoja',            'Aretes con motivo de hoja en plata .925. Diseño inspirado en la naturaleza.',             0, 'Plata .925', 'aretes', '{/images/aretes/aretes10.png}'),
  ('Aretes Infinito',        'aretes-infinito',        'Aretes con símbolo infinito en plata .925. Delicados y con mucho significado.',           0, 'Plata .925', 'aretes', '{/images/aretes/aretes11.png}'),
  ('Aretes Paloma',          'aretes-paloma',          'Aretes con paloma en plata .925. Símbolo de paz con acabado artesanal.',                  0, 'Plata .925', 'aretes', '{/images/aretes/aretes12.png}'),
  ('Aretes Diamante',        'aretes-diamante',        'Aretes con corte diamante en plata .925. Máximo brillo y elegancia.',                     0, 'Plata .925', 'aretes', '{/images/aretes/aretes13.png}'),
  ('Aretes Cuadro',          'aretes-cuadro',          'Aretes cuadrados en plata .925. Diseño geométrico y moderno, perfectos para looks urbanos.', 0, 'Plata .925', 'aretes', '{/images/aretes/aretes14.png}'),
  ('Aretes Flecha',          'aretes-flecha',          'Aretes flecha en plata .925. Símbolo de dirección y propósito. Diseño unisex.',           0, 'Plata .925', 'aretes', '{/images/aretes/aretes15.png}'),

  -- DIJES (8)
  ('Dije Corazón',        'dije-corazon',       'Dije de corazón en plata .925. Clásico y atemporal, perfecto para cualquier cadena.',           0, 'Plata .925', 'dijes', '{/images/dijes/dije1.png}'),
  ('Dije Luna',           'dije-luna',          'Dije de luna en plata .925. Diseño místico y delicado para lucir en cadena o pulsera.',         0, 'Plata .925', 'dijes', '{/images/dijes/dije2.png}'),
  ('Dije Amatista Lila',  'dije-amatista-lila', 'Dije con amatista lila en plata .925. Incluye cadena de 40 cm. Color y elegancia únicos.',      0, 'Plata .925', 'dijes', '{/images/dijes/dije3.png}'),
  ('Dije Amatista Roja',  'dije-amatista-roja', 'Dije con amatista roja en plata .925. Incluye cadena de 40 cm. Vibrante y llamativo.',          0, 'Plata .925', 'dijes', '{/images/dijes/dije4.png}'),
  ('Dije Mariposa',       'dije-mariposa',      'Dije de mariposa en plata .925. Símbolo de transformación y belleza.',                          0, 'Plata .925', 'dijes', '{/images/dijes/dije5.png}'),
  ('Dije Flor',           'dije-flor',          'Dije de flor en plata .925. Diseño delicado y romántico para cadena o aretes.',                 0, 'Plata .925', 'dijes', '{/images/dijes/dije6.png}'),
  ('Dije Infinito',       'dije-infinito',      'Dije con símbolo infinito en plata .925. Representa amor sin fin.',                             0, 'Plata .925', 'dijes', '{/images/dijes/dije7.png}'),
  ('Dije Ojo Turco',      'dije-ojo-turco',     'Dije de ojo turco en plata .925. Protección y buena energía donde vayas.',                     0, 'Plata .925', 'dijes', '{/images/dijes/dije8.png}'),

  -- PULSERAS (2)
  ('Pulsera Espiga',  'pulsera-espiga',  'Pulsera de cadena espiga en plata .925. Flexible y elegante, se adapta a cualquier muñeca.',          0, 'Plata .925', 'pulseras', '{/images/pulseras/pulsera1.png}'),
  ('Pulsera Fígaro',  'pulsera-figaro',  'Pulsera de cadena fígaro en plata .925. Diseño clásico italiano con eslabones alternados.',           0, 'Plata .925', 'pulseras', '{/images/pulseras/pulsera2.png}'),

  -- ARRACADAS (1)
  ('Arracadas con Diseño', 'arracadas-con-diseno', 'Arracadas de 3 cm con diseño artesanal en plata .925. Estilo mexicano auténtico.',           0, 'Plata .925', 'arracadas', '{/images/arracadas/arracadas1.png}'),

  -- CADENAS (1)
  ('Cadena Tricolor Varada', 'cadena-tricolor', 'Cadena de 35 cm en plata .925 con diseño varado de 3 colores. Única y elegante.',              0, 'Plata .925', 'cadenas', '{/images/cadena/cadena1.png}'),

  -- ESCLAVAS (2)
  ('Esclava Clásica 20 cm', 'esclava-clasica',   'Esclava rígida de 20 cm en plata .925 certificada. Diseño pulido y atemporal.',              0, 'Plata .925', 'esclavas', '{/images/esclava/esclava1.png}'),
  ('Esclava Elegante',      'esclava-elegante',  'Esclava en plata .925 certificada. Acabado pulido y diseño sofisticado.',                    0, 'Plata .925', 'esclavas', '{/images/esclava/esclava2.png}')

) AS t(name, slug, description, price, material, cat_slug, images)
WHERE NOT EXISTS (SELECT 1 FROM products WHERE products.slug = t.slug);

-- ── 3. VARIANTE DEFAULT (1 pieza) para cada producto sin variantes ─
INSERT INTO product_variants (product_id, variant_name, stock)
SELECT p.id, 'Unitalla', 1
FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id
);
