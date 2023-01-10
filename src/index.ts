import {  getAllProducts, getAllPurchasesFromUserId, getAllUsers, products, purchaseHistory, queryProductsByName, users, getProductById } from "./database"
import {  Category, TProduct, TPurchase, TUser } from "./types"
import express, {Request, Response} from "express"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log(`serviddor rodando na porta 3003`)
})

app.get('/ping',(req:Request, res:Response)=>{
    res.send('servidor rodando')
})



//users*************************************************
app.get('/users',(req:Request, res:Response)=>{
    res.status(200).send(getAllUsers())
})

app.post('/users',(req:Request, res:Response)=>{
    const {id, email, password} = req.body as TUser
    const newUser:TUser ={
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send("User criado com sucesso")
})

app.delete('/user/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const result = users.filter((user)=>user.id!==id)
    console.log(result)
    res.status(200).send("User apagado com sucesso")
})

app.put('/user/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user)=>user.id===id)
    if(user){
        user.email = newEmail || user.email
        user.password = newPassword || user.password
        console.log(user)
        res.status(200).send("Cadastro atualizado com sucesso")
    }
})


//Products****************************************************
app.get('/products',(req:Request, res:Response)=>{
    res.status(200).send(getAllProducts())
})

app.get('/products/search',(req:Request, res:Response)=>{
    const name = req.query.name as string

        res.status(200).send(queryProductsByName(name))
})
app.get('/product/:id',(req:Request, res:Response)=>{
    const id = req.params.id as string

        res.status(200).send(getProductById(id))
})

app.post('/products',(req:Request, res:Response)=>{
    const {id,name,price,category} = req.body as TProduct
    const newProduct:TProduct ={
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto criado com sucesso")
})

app.delete('/product/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const result = products.filter((product)=>product.id!==id)
    console.log(result)
    res.status(200).send("Produto apagado com sucesso")
})

app.put('/product/:id',(req:Request, res:Response)=>{
    const id = req.params.id
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as Category | undefined

    const product = products.find((product)=>product.id===id)
    if(product){
        product.name = newName || product.name
        product.price = isNaN(newPrice)?product.price: newPrice
        product.category = newCategory || product.category
        console.log(product)
        res.status(200).send("Produto atualizado com sucesso")
    }
})


//purchase************************************************************
app.post('/purchase',(req:Request, res:Response)=>{
const {userId, productId, quantity, totalPrice} = req.body as TPurchase
const newPurchase ={
    userId,
    productId,
    quantity,
    totalPrice
}
purchaseHistory.push(newPurchase)
res.status(201).send("Compra realizada com sucesso")
})

app.get('/user/:id/purchase/',(req:Request, res:Response)=>{
    const id = req.params.id
    res.status(200).send(getAllPurchasesFromUserId(id))
})


