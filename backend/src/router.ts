import { Router } from 'express';
import { db } from './db';

const router = Router();

router.get('/', (req, res) => {
  const page = Math.max(parseInt(req.query.page as string) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit as string) || 3, 1);
  const offset = (page - 1) * limit;
  const sizes = (req.query.sizes as string | undefined)?.trim();
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  const colors = (req.query.colors as string | undefined)?.trim();
  const gender = (req.query.gender as string | undefined)?.trim();

  const whereConditions: string[] = [];
  const params: Array<string | number> = [];

  if (sizes) {
    const sizeArray = sizes.split(',').map((size) => size.trim()).filter(Boolean);
    whereConditions.push(`size_prod IN (${sizeArray.map(() => '?').join(',')})`);
    params.push(...sizeArray);
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    whereConditions.push('precio_prod BETWEEN ? AND ?');
    params.push(minPrice, maxPrice);
  } else if (minPrice !== undefined) {
    whereConditions.push('precio_prod >= ?');
    params.push(minPrice);
  } else if (maxPrice !== undefined) {
    whereConditions.push('precio_prod <= ?');
    params.push(maxPrice);
  }

  if (colors) {
    const colorArray = colors.split(',').map((color) => color.trim()).filter(Boolean);
    whereConditions.push(`color_prod IN (${colorArray.map(() => '?').join(',')})`);
    params.push(...colorArray);
  }

  if (gender) {
    whereConditions.push('categoria_prod = ?');
    params.push(gender);
  }

  const whereClause = whereConditions.length ? ` WHERE ${whereConditions.join(' AND ')}` : '';
  const totalRow = db.prepare(`SELECT COUNT(*) AS total FROM productos${whereClause}`).get(...params) as { total: number };
  const productos = db.prepare(`SELECT * FROM productos${whereClause} LIMIT ? OFFSET ?`).all(...params, limit, offset);

  res.json({
    productos,
    pagination: {
      total: totalRow.total,
      page,
      limit,
      totalPages: Math.ceil(totalRow.total / limit),
    },
  });
});

router.get('/search/:name', (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.json({ productos: [], pagination: { totalPages: 0 } });
  }

  const searchTerm = `%${name}%`;
  const productos = db.prepare(
    'SELECT * FROM productos WHERE mane_prod LIKE ? OR desc_prod LIKE ?'
  ).all(searchTerm, searchTerm);

  res.json({
    productos,
    pagination: {
      totalPages: Math.ceil((productos as unknown[]).length / 3),
    },
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const producto = db.prepare('SELECT * FROM productos WHERE id_prod = ?').get(id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json({ producto });
});

router.post('/', (req, res) => {
  const { name, asunto, email, telefono, mensaje, pais, tipo_cliente, categoria_interes } = req.body;

  if (!name || !asunto || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const result = db.prepare(`
    INSERT INTO contactos (name, asunto, email, telefono, mensaje, pais, tipo_cliente, categoria_interes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(name, asunto, email, telefono ?? null, mensaje, pais ?? null, tipo_cliente ?? null, categoria_interes ?? null);

  res.status(201).json({
    message: 'Contacto guardado',
    id: Number(result.lastInsertRowid),
  });
});

export default router;
