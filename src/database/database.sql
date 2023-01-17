-- Active: 1673961752633@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

PRAGMA table_info("users");
SELECT * FROM users;

INSERT INTO users (id,email,password)
VALUES
("u01","a@gmail.com","1a@A");
INSERT INTO users (id,email,password)
VALUES
("u02","b@gmail.com","1b@A"),
("u03","c@gmail.com","1b@A");

UPDATE users SET password="1" WHERE id='u03';

DELETE FROM users WHERE id='u01';

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id,name,price,category)
VALUES('p01','produto 1',10.1,'Eletrônicos');
INSERT INTO products (id,name,price,category)
VALUES
('p04','produto 4',40.1,'Roupas e calçados'),
('p05','produto 5',50.1,'Acessórios');


--Simulação de API
--getAllusers
SELECT * FROM users;
--getAllProducts
SELECT * FROM products;
--getUserByName
SELECT * FROM users
WHERE name LIKE "%prod"
--createNewUser
INSERT INTO users (id,email,password)
VALUES
("u01","a@gmail.com","1a@A");
--createNewProduct
INSERT INTO products (id,name,price,category)
VALUES('p01','produto 1',10.1,'Eletrônicos');
--getProductByID
SELECT * FROM products
WHERE id='p01'
--deleteUserByID
DELETE FROM users WHERE id='u01';
--delteProductByID
DELETE FROM products WHERE id='p01';
--editUserByID
UPDATE users 
SET 
email="nv@gmail.com",
password="1" 
WHERE id='u01';
--editProductByID
UPDATE products
SET 
name="nome update",
price =1, 
category="Eletrônicos"
WHERE id="p02";
--getAllUserOrdenado crescente
SELECT * FROM users
ORDER BY email ASC;
--getProducts order by pric ASC limit 20 offset 0
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;
--getProducts entre precos 1 a 20 order ASC
SELECT * FROM products
WHERE price>=1 AND price <=20
ORDER BY price ASC;
