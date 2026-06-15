import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const rootDir = path.resolve(process.cwd());
const dataDir = path.join(rootDir, 'data');
const dbPath = path.join(dataDir, 'tienda_shoes.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS productos (
    id_prod INTEGER PRIMARY KEY AUTOINCREMENT,
    imageUrl_prod TEXT NOT NULL,
    mane_prod TEXT NOT NULL,
    precio_prod INTEGER NOT NULL,
    desc_prod TEXT NOT NULL,
    size_prod TEXT NOT NULL DEFAULT '',
    color_prod TEXT NOT NULL,
    categoria_prod TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contactos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    asunto TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    mensaje TEXT NOT NULL,
    pais TEXT,
    tipo_cliente TEXT,
    categoria_interes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const productCount = db.prepare('SELECT COUNT(*) AS total FROM productos').get() as { total: number };

if (productCount.total === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO productos (
      imageUrl_prod, mane_prod, precio_prod, desc_prod, size_prod, color_prod, categoria_prod
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const seedProducts = [
    ['/img/taconNegroElegante.png', 'Venus Black', 120000, 'Tacón bicolor en ante y cuero con punta negra, perfil elegante y abertura lateral que estiliza el empeine.', '38', 'negro', 'calzado'],
    ['/img/taconRojo.png', 'Scarlet', 150000, 'Stiletto rojo en ante con punta afilada y silueta refinada, pensado para destacar en ocasiones especiales.', '39', 'rojo', 'calzado'],
    ['/img/zapatoMarron.png', 'Café Classic', 85000, 'Tacón medio en tono marrón chocolate, cómodo y versátil para oficina, reuniones o looks diarios.', '36', 'marron', 'calzado'],
    ['/img/zapatoBlanco.png', 'Stardust', 95000, 'Zapato clásico con brillo sutil y acabado pulido, ideal para elevar un outfit con discreción.', '38', 'negro', 'calzado'],
    ['https://res.cloudinary.com/dxcpiqu4k/image/upload/v1775000927/producto7_g8ed8o.jpg', 'Rivelle', 80000, 'Bolso de mano con silueta estructurada tipo caja mini, en rosa palo mate. detalle metalico dorado.', '', 'blanco', 'bolsos'],
    ['https://res.cloudinary.com/dxcpiqu4k/image/upload/v1775003317/producto6_ctbjpu.jpg', 'Corre Ámbar', 65000, 'Correa en cuero liso tono marrón. hebilla ovalada en metal doradocon pasador central.', '', 'marron', 'accesorios'],
  ];

  for (const product of seedProducts) {
    insertProduct.run(...product);
  }
}

const imageUpdates = [
  ['/img/taconNegroElegante.png', 'Venus Black'],
  ['/img/taconRojo.png', 'Scarlet'],
  ['/img/zapatoMarron.png', 'Café Classic'],
  ['/img/zapatoBlanco.png', 'Stardust'],
];

const updateImageByName = db.prepare('UPDATE productos SET imageUrl_prod = ? WHERE mane_prod = ?');

for (const [imageUrl, name] of imageUpdates) {
  updateImageByName.run(imageUrl, name);
}
