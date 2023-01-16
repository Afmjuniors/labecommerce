-- Active: 1673889312564@@127.0.0.1@3306
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