-- Active: 1673961752633@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    modified_at TEXT DEFAULT(DATETIME()) NOT NULL,
    create_at TEXT DEFAULT(DATETIME()) NOT NULL
);
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    url_image TEXT NOT NULL,
    modified_at TEXT DEFAULT(DATETIME()) NOT NULL,
    create_at TEXT DEFAULT(DATETIME()) NOT NULL
   
);
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL DEFAULT(0) NOT NULL ,
    paid INTEGER DEFAULT(0) NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    modified_at TEXT DEFAULT(DATETIME()) NOT NULL,
    create_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    subtotal REAL NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

DROP TABLE purchases_products;
DROP TABLE purchases;
DROP TABLE products;
DROP TABLE users;
DROP TABLE testes;
