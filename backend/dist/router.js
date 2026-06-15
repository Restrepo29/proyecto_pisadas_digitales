"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("./db");
var router = (0, express_1.Router)();
router.get('/', function (req, res) {
    var _a, _b;
    var _c, _d, _e;
    var page = Math.max(parseInt(req.query.page) || 1, 1);
    var limit = Math.max(parseInt(req.query.limit) || 3, 1);
    var offset = (page - 1) * limit;
    var sizes = (_c = req.query.sizes) === null || _c === void 0 ? void 0 : _c.trim();
    var minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
    var maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    var colors = (_d = req.query.colors) === null || _d === void 0 ? void 0 : _d.trim();
    var gender = (_e = req.query.gender) === null || _e === void 0 ? void 0 : _e.trim();
    var whereConditions = [];
    var params = [];
    if (sizes) {
        var sizeArray = sizes.split(',').map(function (size) { return size.trim(); }).filter(Boolean);
        whereConditions.push("size_prod IN (".concat(sizeArray.map(function () { return '?'; }).join(','), ")"));
        params.push.apply(params, sizeArray);
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
        whereConditions.push('precio_prod BETWEEN ? AND ?');
        params.push(minPrice, maxPrice);
    }
    else if (minPrice !== undefined) {
        whereConditions.push('precio_prod >= ?');
        params.push(minPrice);
    }
    else if (maxPrice !== undefined) {
        whereConditions.push('precio_prod <= ?');
        params.push(maxPrice);
    }
    if (colors) {
        var colorArray = colors.split(',').map(function (color) { return color.trim(); }).filter(Boolean);
        whereConditions.push("color_prod IN (".concat(colorArray.map(function () { return '?'; }).join(','), ")"));
        params.push.apply(params, colorArray);
    }
    if (gender) {
        whereConditions.push('categoria_prod = ?');
        params.push(gender);
    }
    var whereClause = whereConditions.length ? " WHERE ".concat(whereConditions.join(' AND ')) : '';
    var totalRow = (_a = db_1.db.prepare("SELECT COUNT(*) AS total FROM productos".concat(whereClause))).get.apply(_a, params);
    var productos = (_b = db_1.db.prepare("SELECT * FROM productos".concat(whereClause, " LIMIT ? OFFSET ?"))).all.apply(_b, __spreadArray(__spreadArray([], params, false), [limit, offset], false));
    res.json({
        productos: productos,
        pagination: {
            total: totalRow.total,
            page: page,
            limit: limit,
            totalPages: Math.ceil(totalRow.total / limit),
        },
    });
});
router.get('/search/:name', function (req, res) {
    var name = req.params.name;
    if (!name) {
        return res.json({ productos: [], pagination: { totalPages: 0 } });
    }
    var searchTerm = "%".concat(name, "%");
    var productos = db_1.db.prepare('SELECT * FROM productos WHERE mane_prod LIKE ? OR desc_prod LIKE ?').all(searchTerm, searchTerm);
    res.json({
        productos: productos,
        pagination: {
            totalPages: Math.ceil(productos.length / 3),
        },
    });
});
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var producto = db_1.db.prepare('SELECT * FROM productos WHERE id_prod = ?').get(id);
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ producto: producto });
});
router.post('/', function (req, res) {
    var _a = req.body, name = _a.name, asunto = _a.asunto, email = _a.email, telefono = _a.telefono, mensaje = _a.mensaje, pais = _a.pais, tipo_cliente = _a.tipo_cliente, categoria_interes = _a.categoria_interes;
    if (!name || !asunto || !email || !mensaje) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    var result = db_1.db.prepare("\n    INSERT INTO contactos (name, asunto, email, telefono, mensaje, pais, tipo_cliente, categoria_interes)\n    VALUES (?, ?, ?, ?, ?, ?, ?, ?)\n  ").run(name, asunto, email, telefono !== null && telefono !== void 0 ? telefono : null, mensaje, pais !== null && pais !== void 0 ? pais : null, tipo_cliente !== null && tipo_cliente !== void 0 ? tipo_cliente : null, categoria_interes !== null && categoria_interes !== void 0 ? categoria_interes : null);
    res.status(201).json({
        message: 'Contacto guardado',
        id: Number(result.lastInsertRowid),
    });
});
exports.default = router;
//# sourceMappingURL=router.js.map