"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
(0, database_1.createUser)('00002', 'a@a.a', 'aaaa');
console.table((0, database_1.getAllUsers)());
(0, database_1.createProduct)('01', 'name', 10, types_1.Category.ELECTRONICS);
console.table((0, database_1.getAllProducts)());
console.table((0, database_1.getProductById)('1'));
console.table((0, database_1.queryProductsByName)("P"));
(0, database_1.createPurchase)("u003", "p004", 2, 1600);
console.table((0, database_1.getAllPurchasesFromUserId)('a'));
//# sourceMappingURL=index.js.map