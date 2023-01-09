import { createPurchase,  getAllProducts, getAllPurchasesFromUserId, getAllUsers, getProductById, products, purchaseHistory, queryProductsByName, users } from "./database"
import { Category, TProduct, TPurchase, TUser } from "./types"
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




app.get('/users',(req:Request, res:Response)=>{
    res.status(200).send(getAllUsers())
})

app.get('/products',(req:Request, res:Response)=>{
    res.status(200).send(getAllProducts())
})

app.get('/products/search',(req:Request, res:Response)=>{
    const name = req.query.name as string
    const id = req.query.id as string
    if(name){
        res.status(200).send(queryProductsByName(name))

    }else if(id){
        res.status(200).send(queryProductsByName(id))
    }
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

app.get('/purchase/search',(req:Request, res:Response)=>{
    const q = req.query.q as string
    res.status(200).send(getAllPurchasesFromUserId(q))
})


