-- Active: 1673961752633@@127.0.0.1@3306
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

--getAllPurchase
SELECT * FROM purchases;
--getPurchaseByUserId
SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE buyer_id ='u001';

--createNewPurchase
INSERT INTO purchases(id,buyer_id,total_price)
VALUES
('ph001','u001',10.1),
('ph002','u001',20.2),
('ph003','u002',30.99),
('ph004','u002',10),
('ph005','u003',20),
('ph006','u003',101),
('ph007','u004',20),
('ph008','u004',50.5),
('ph009','u005',303),
('ph0010','u005',61.98);

--editPurchasePaid
UPDATE purchases
SET 
paid=1
WHERE id = 'ph001';

--editPurchaseDelivred
UPDATE purchases
SET 
delivered_at= DATETIME('now')
WHERE id = 'ph001';