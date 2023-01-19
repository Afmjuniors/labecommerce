-- Active: 1673961752633@@127.0.0.1@3306
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    create_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

--createNewPurchaseProducts
INSERT INTO purchases_products(purchase_id,product_id,quantity)
VALUES
('ph001','p001',1),
('ph002','p001',2),
('ph003','p002',1),
('ph004','p003',1),
('ph005','p003',2),
('ph006','p006',1),
('ph007','p004',1),
('ph008','p001',5),
('ph009','p006',3),
('ph0010','p002',2);

SELECT * FROM purchases_products;

--getPurchaseHistoryComplete
SELECT
purchases.id AS purchaseID,
products.id AS productID,
products.name AS productName,
products.price,
purchases_products.quantity,
purchases.total_price,
users.id AS userID,
users.name AS userName,
purchases.paid,
purchases.delivered_at 
FROM products
LEFT JOIN purchases_products
ON products.id=purchases_products.product_id
LEFT JOIN purchases
ON purchases.id=purchases_products.purchase_id
LEFT JOIN users
ON users.id=purchases.buyer_id;



SELECT * FROM products
INNER JOIN purchases_products
ON products.id=purchases_products.product_id
INNER JOIN purchases
ON purchases.id=purchases_products.purchase_id
INNER JOIN users
ON users.id=purchases.buyer_id;






