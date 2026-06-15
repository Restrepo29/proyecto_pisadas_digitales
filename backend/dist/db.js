"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var node_sqlite_1 = require("node:sqlite");
var rootDir = node_path_1.default.resolve(process.cwd());
var dataDir = node_path_1.default.join(rootDir, 'data');
var dbPath = node_path_1.default.join(dataDir, 'tienda_shoes.db');
if (!node_fs_1.default.existsSync(dataDir)) {
    node_fs_1.default.mkdirSync(dataDir, { recursive: true });
}
exports.db = new node_sqlite_1.DatabaseSync(dbPath);
exports.db.exec("\n  PRAGMA journal_mode = WAL;\n  PRAGMA foreign_keys = ON;\n\n  CREATE TABLE IF NOT EXISTS productos (\n    id_prod INTEGER PRIMARY KEY AUTOINCREMENT,\n    imageUrl_prod TEXT NOT NULL,\n    mane_prod TEXT NOT NULL,\n    precio_prod INTEGER NOT NULL,\n    desc_prod TEXT NOT NULL,\n    size_prod TEXT NOT NULL DEFAULT '',\n    color_prod TEXT NOT NULL,\n    categoria_prod TEXT NOT NULL\n  );\n\n  CREATE TABLE IF NOT EXISTS contactos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT NOT NULL,\n    asunto TEXT NOT NULL,\n    email TEXT NOT NULL,\n    telefono TEXT,\n    mensaje TEXT NOT NULL,\n    pais TEXT,\n    tipo_cliente TEXT,\n    categoria_interes TEXT,\n    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP\n  );\n");
var productCount = exports.db.prepare('SELECT COUNT(*) AS total FROM productos').get();
if (productCount.total === 0) {
    var insertProduct = exports.db.prepare("\n    INSERT INTO productos (\n      imageUrl_prod, mane_prod, precio_prod, desc_prod, size_prod, color_prod, categoria_prod\n    ) VALUES (?, ?, ?, ?, ?, ?, ?)\n  ");
    var seedProducts = [
        ['/img/taconNegroElegante.png', 'Venus Black', 120000, 'Tacón bicolor en ante y cuero con punta negra, perfil elegante y abertura lateral que estiliza el empeine.', '38', 'negro', 'calzado'],
        ['/img/taconRojo.png', 'Scarlet', 150000, 'Stiletto rojo en ante con punta afilada y silueta refinada, pensado para destacar en ocasiones especiales.', '39', 'rojo', 'calzado'],
        ['/img/zapatoMarron.png', 'Café Classic', 85000, 'Tacón medio en tono marrón chocolate, cómodo y versátil para oficina, reuniones o looks diarios.', '36', 'marron', 'calzado'],
        ['/img/zapatoBlanco.png', 'Stardust', 95000, 'Zapato clásico con brillo sutil y acabado pulido, ideal para elevar un outfit con discreción.', '38', 'negro', 'calzado'],
        ['https://res.cloudinary.com/dxcpiqu4k/image/upload/v1775000927/producto7_g8ed8o.jpg', 'Rivelle', 80000, 'Bolso de mano con silueta estructurada tipo caja mini, en rosa palo mate. detalle metalico dorado.', '', 'blanco', 'bolsos'],
        ['https://res.cloudinary.com/dxcpiqu4k/image/upload/v1775003317/producto6_ctbjpu.jpg', 'Corre Ámbar', 65000, 'Correa en cuero liso tono marrón. hebilla ovalada en metal doradocon pasador central.', '', 'marron', 'accesorios'],
    ];
    for (var _i = 0, seedProducts_1 = seedProducts; _i < seedProducts_1.length; _i++) {
        var product = seedProducts_1[_i];
        insertProduct.run.apply(insertProduct, product);
    }
}
var imageUpdates = [
    ['/img/taconNegroElegante.png', 'Venus Black'],
    ['/img/taconRojo.png', 'Scarlet'],
    ['/img/zapatoMarron.png', 'Café Classic'],
    ['/img/zapatoBlanco.png', 'Stardust'],
];
var updateImageByName = exports.db.prepare('UPDATE productos SET imageUrl_prod = ? WHERE mane_prod = ?');
for (var _a = 0, imageUpdates_1 = imageUpdates; _a < imageUpdates_1.length; _a++) {
    var _b = imageUpdates_1[_a], imageUrl = _b[0], name = _b[1];
    updateImageByName.run(imageUrl, name);
}
//# sourceMappingURL=db.js.map