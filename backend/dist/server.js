"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var db_1 = require("./db");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log("SQLite abierta en: ".concat(db_1.db.open ? 'sí' : 'no'));
app.use('/api/store', router_1.default);
app.use('/api/user', router_1.default);
app.get('/api/health', function (_req, res) {
    res.json({ ok: true });
});
exports.default = app;
//# sourceMappingURL=server.js.map