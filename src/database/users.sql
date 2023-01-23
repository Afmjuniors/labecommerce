-- Active: 1673961752633@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

--getAllusers
SELECT * FROM users;
--getAllUserOrdenado crescente
SELECT * FROM users
ORDER BY email ASC;
--getUserByName
SELECT * FROM users
WHERE name LIKE "%Alex%";



--createNewUser
INSERT INTO users (id,name,email,password)
VALUES
("u001","Alexandre","a@gmail.com","1a@A"),
("u002","Alex","alex@gmail.com","1a@A"),
("u003","Andre","andre@gmail.com","1a@A"),
("u004","Bernardo","bernardo@mail.com","1a@A"),
("u005","Maria","maria@gmail.com","1a@A");
INSERT INTO users (id,name,email,password)
VALUES
("u006","aaaa","aaaaaa@gmail.com","1aaa@A");
--editUserByID
UPDATE users 
SET 
email="nv@gmail.com",
password="1" 
WHERE id='u001';

--deleteUserByID
DELETE FROM users WHERE id='u001';