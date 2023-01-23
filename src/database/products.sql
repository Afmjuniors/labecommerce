-- Active: 1673961752633@@127.0.0.1@3306
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


--getAllProducts
SELECT * FROM products;
--getProductByID
SELECT * FROM products
WHERE id='p001';
--getProducts order by pric ASC limit 20 offset 0
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 0;
--getProducts entre precos 1 a 20 order ASC
SELECT * FROM products
WHERE price>=1 AND price <=20
ORDER BY price ASC;

--createNewProduct
INSERT INTO products (id,name,price,category)
VALUES
('p001','produto 1',10.1,'Eletrônicos'),
('p002','produto 2',30.99,'Roupas e calçados'),
('p003','produto 3',10,'Acessórios'),
('p004','produto 4',20,'Acessórios'),
('p005','produto 5',10,'Eletrônicos'),
('p006','produto 6',101,'Eletrônicos');

--editProductByID
UPDATE products
SET 
name="nome update",
price =1, 
category="Eletrônicos"
WHERE id="p002";

--delteProductByID
DELETE FROM products WHERE id='p01';