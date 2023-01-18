import { getAllProducts, getAllPurchasesFromUserId, getAllUsers, products, purchaseHistory, queryProductsByName, users, getProductById } from "./database"
import { Category, TProduct, TPurchase, TUser } from "./types"
import express, { Request, Response } from "express"
import cors from 'cors'
import { send } from "process"

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log(`serviddor rodando na porta 3003`)
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('servidor rodando')
})





//users*************************************************
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(getAllUsers())

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
//addNewUser
app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body as TUser
        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("Id tem que ser uma string");
        }
        if (typeof email !== 'string') {
            res.status(400)
            throw new Error("Email tem que ser uma string");
        }
        if (typeof password !== 'string') {
            res.status(400)
            throw new Error("passwrd tem que ser uma string");
        }

        const avalibleID = users.find((user) => user.id === id)
        if (avalibleID) {
            res.status(422)
            throw new Error("Id ja utilizado em outro usuario");

        }
        const avalibleEmail = users.find((user) => user.email === email)
        if (avalibleEmail) {
            res.status(422)
            throw new Error("Email ja utilizado em outro usuario");

        }
        const newUser: TUser = {
            id,
            email,
            password
        }
        users.push(newUser)
        res.status(201).send("User criado com sucesso")

    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//removeUserByID
app.delete('/user/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexUser = users.findIndex((user) => user.id === id)

        if (indexUser >= 0) {
            users.splice(indexUser, 1)
            res.status(200).send("User apagado com sucesso")

        } else {
            res.status(404).send("Usuario não encontrado")
        }


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
//editUserById
app.put('/user/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { newEmail, newPassword } = req.body

        if (newEmail !== undefined) {
            if (typeof newEmail !== 'string') {
                res.status(400)
                throw new Error("Email deve ser uma string");
            }
            if (newEmail.length < 6) {
                res.status(400)
                throw new Error("Email deve ter pelomenos 6 caracteres");
            }
            if (!newEmail.includes("@")) {
                res.status(400)
                throw new Error("Email deve ter @");
            }

        }
        if (newPassword !== undefined) {
            if (typeof newPassword !== 'string') {
                res.status(400)
                throw new Error("Password deve ser uma string");
            }
            if (newPassword.length < 4) {
                res.status(400)
                throw new Error("Password deve ter pelomenos 4 caracteres");
            }
        }
        const user = users.find((user) => user.id === id)
        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password
            console.log(user)
            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Usuario não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//Products****************************************************
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(getAllProducts())


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
//getProductByName
app.get('/products/search', (req: Request, res: Response) => {



    try {
        const name = req.query.name
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("query tem q ser uma string");
        }
        if (name.length < 1) {
            res.status(400)
            throw new Error("Query tem que ter ao menos 1 caracter");
        }

        res.status(200).send(queryProductsByName(name))


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})
app.get('/product/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const avalibleID = products.find((product) => product.id === id)
        console.log(avalibleID)
        if (avalibleID) {
            res.status(200).send(avalibleID)
        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.post('/products', (req: Request, res: Response) => {

    try {
        const { id, name, price, category } = req.body as TProduct

        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("Id tem que ser uma string");
        }
        if (typeof name !== 'string') {
            res.status(400)
            throw new Error("Name tem que ser uma string");
        }
        if (typeof price !== 'number') {
            res.status(400)
            throw new Error("Price tem que ser um number");
        }


        if (category !== Category.ACCESSORIES &&
            category !== Category.CLOTHES_AND_SHOES &&
            category !== Category.ELECTRONICS) {
            res.status(400)
            throw new Error(`Catgegoria tem que ser, ${Category.ACCESSORIES}, ${Category.CLOTHES_AND_SHOES} ou ${Category.ELECTRONICS}`);
        }

        const avalibleID = products.find((product) => product.id === id)
        if (avalibleID) {
            res.status(422)
            throw new Error("Id de produto tem que ser unico");
        }

        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }
        products.push(newProduct)
        res.status(201).send("Produto criado com sucesso")


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.delete('/product/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const indexProduct = products.findIndex((product) => product.id === id)

        if (indexProduct >= 0) {
            products.splice(indexProduct, 1)
            res.status(200).send("Produto apagado com sucesso")

        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})



app.put('/product/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category

        if (newName !== undefined) {
            if (typeof newName !== 'string') {
                res.status(400)
                throw new Error("Name deve ser uma string");
            }
            if (newName.length < 1) {
                res.status(400)
                throw new Error("Name deve ter pelo menos 1 character");
            }
        }
        if (newPrice !== undefined) {
            if (typeof newPrice !== 'number') {
                res.status(400)
                throw new Error("Price deve ser um number");
            }
            if (newPrice < 0) {
                res.status(400)
                throw new Error("Price não pode ser negativo");
            }
        }
        if (newCategory !== undefined) {
            if (newCategory !== Category.ACCESSORIES &&
                newCategory !== Category.CLOTHES_AND_SHOES &&
                newCategory !== Category.ELECTRONICS) {
                res.status(400)
                throw new Error(`Catgegoria tem que ser, ${Category.ACCESSORIES}, ${Category.CLOTHES_AND_SHOES} ou ${Category.ELECTRONICS}`);
            }
        }

        const product = products.find((product) => product.id === id)
        if (product) {
            product.name = newName || product.name
            product.price = isNaN(newPrice) ? product.price : newPrice
            product.category = newCategory || product.category
            console.log(product)
            res.status(200).send("Produto atualizado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//purchase************************************************************
app.post('/purchase', (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body as TPurchase

        if (typeof userId !== 'string') {
            res.status(400)
            throw new Error("userID tem que ser uma string");
        }
        if (typeof productId !== 'string') {
            res.status(400)
            throw new Error("productId tem que ser uma string");
        }
        if (typeof quantity !== 'number') {
            res.status(400)
            throw new Error("quantity tem que ser um number");
        }

        const avalibleID: TUser | undefined = users.find((user) => user.id === userId)
        const avalibleIDProduct: TProduct | undefined = products.find((product) => product.id === productId)

        if (!avalibleID) {
            res.status(400)
            throw new Error("Não foi possivel achar o usuario pelo ID");
        }
        if (!avalibleIDProduct) {
            res.status(400)
            throw new Error("Não foi possivel achar o Produto pelo ID");
        }

        const totalPrice = avalibleIDProduct.price * quantity




        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }
        purchaseHistory.push(newPurchase)
        res.status(201).send("Compra realizada com sucesso")


    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.get('/user/:id/purchase/', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const arrayPurchaseHistory = purchaseHistory.filter((purchase) => purchase.userId === id)
        const avalibleID = users.find((user) => user.id === id)
        if (!avalibleID) {
            res.status(400)
            throw new Error("Usuario não encontrado");
        }
        if (arrayPurchaseHistory.length > 0) {
            res.status(200).send(arrayPurchaseHistory)
        } else {
            res.status(404).send("Esse usuario não possui compras")
        }
    } catch (error: any) {
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})


