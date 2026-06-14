import { Router } from "express";
import { DB } from "./server";
import { RowDataPacket } from "mysql2";

const router = Router();



// Obtener productos PAGINADOS
router.get('/', async (req, res) => {
 
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
     const sizes = req.query.sizes as string;
     const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined;
const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined;
const colors = req.query.colors as string;
    const offset = (page - 1) * limit;
    const gender = req.query.gender as string;

    try {
        let whereConditions: string[] = [];
  
    let filterParams: any[] = [];
    
    // Procesar filtros una sola vez
    if (sizes && sizes.trim() !== '') {
        const sizeArray = sizes.split(',').map(s => s.trim()).filter(s => s);
      
          whereConditions.push('size_prod IN (?)');
        filterParams.push(sizeArray);
    }

    // Filtro por precio (nuevo)
if (minPrice !== undefined && maxPrice !== undefined) {
    whereConditions.push('precio_prod BETWEEN ? AND ?');
    filterParams.push(minPrice, maxPrice);
} else if (minPrice !== undefined) {
    whereConditions.push('precio_prod >= ?');
    filterParams.push(minPrice);
} else if (maxPrice !== undefined) {
    whereConditions.push('precio_prod <= ?');
    filterParams.push(maxPrice);
}
 
// Filtro por color 
if (colors && colors.trim() !== '') {
    const colorArray = colors.split(',').map(c => c.trim()).filter(c => c);
    whereConditions.push('color_prod IN (?)');
    filterParams.push(colorArray);
}

// Filtro por género/categoría
if (gender && gender.trim() !== '') {
    whereConditions.push('categoria_prod = ?');
    filterParams.push(gender);
}

const whereClause = whereConditions.length > 0 ? ' WHERE ' + whereConditions.join(' AND ') : '';
    
    // Contar productos con filtros
    const countQuery = 'SELECT COUNT(*) as total FROM productos' + whereClause;
    const [countResult] = await DB.promise().query(countQuery, filterParams) as [RowDataPacket[], any];
    const total = countResult[0].total;
    
    // Obtener productos con filtros
    const productsQuery = 'SELECT * FROM productos' + whereClause + ' LIMIT ? OFFSET ?';
    const [products] = await DB.promise().query(productsQuery, [...filterParams, limit, offset]

    ) as [RowDataPacket[], any];


    
    res.json({
        productos: products,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    });
   
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});
 



// Busquedad de productos  por ID

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const SQL_QUERY = 'SELECT * FROM productos WHERE id_prod = ?';
    
    DB.query(SQL_QUERY, [id], (err, result: RowDataPacket[]) => {
        if (err) {
            console.error('❌ Error SQL:', err);
            return res.status(500).json({ error: 'Error al obtener producto' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({ producto: result[0] });
    });
});



// Búsqueda de productos por nombre
router.get('/search/:name', (req, res) => {
    const { name } = req.params;
    
    if (!name) {
        return res.json({ productos: [], pagination: { totalPages: 0 } });
    }
 
    const searchQuery = 'SELECT * FROM productos WHERE mane_prod LIKE ? OR desc_prod LIKE ?';
    const searchTerm = `%${name}%`;
    
    DB.query(searchQuery, [searchTerm, searchTerm], (err, result: RowDataPacket[]) => {
        if (err) {
            console.error('❌ Error en búsqueda:', err);
            return res.status(500).json({ error: 'Error en búsqueda' });
        }
        
        res.json({
            productos: result,
            pagination: {
                totalPages: Math.ceil(result.length / 3)
            }
        });
    });
});

// ruta para formulario
router.post('/', (req, res) => {
   
    
    const { name, asunto, email, telefono, mensaje, pais, tipo_cliente, categoria_interes } = req.body;
    
    const SQL_QUERY = `
       INSERT INTO contactos 
        (name, asunto, email, telefono, mensaje, pais, tipo_cliente, categoria_interes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    
    
    DB.query(SQL_QUERY, [name, asunto, email, telefono, mensaje, pais, tipo_cliente, categoria_interes], (err, result) => {
        if (err) {
            console.error('❌ Error SQL:', err);
            return res.status(500).json({ error: 'Error al guardar el contacto' });
        }
        console.log('✅ Registro guardado, ID:', );
        res.json({ message: 'Contacto guardado', });
    });
});


        
export default router;