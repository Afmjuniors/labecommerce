import { createProduct, createPurchase, createUser, getAllProducts, getAllPurchasesFromUserId, getAllUsers, getProductById, queryProductsByName } from "./database"
import { Category } from "./types"

createUser('00002', 'a@a.a','aaaa')
console.table(getAllUsers())


createProduct('01','name',10,Category.ELECTRONICS)
console.table(getAllProducts())
console.table(getProductById('1'))
console.table(queryProductsByName("P"))


createPurchase("u003", "p004", 2, 1600)
console.table(getAllPurchasesFromUserId('a'))