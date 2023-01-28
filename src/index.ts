import { Category, TProduct, TPurchase, TPurchaseProduct, TUser } from "./types"
import express, { Request, Response } from "express"
import cors from 'cors'
import { db } from "./database/knex"


const app = express()

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
//password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log(`serviddor rodando na porta 3003`)
})



//users*************************************************
app.get('/users', async (req: Request, res: Response) => {
    try {
        const name = req.query.name
        let limit = Number(req.query.limit) as number | undefined
        let offset = Number(req.query.offset) as number | undefined

        if (!limit) {
            limit = 20
        }
        if (!offset) {
            offset = 0
        }
        if (typeof limit !== "number") {
            res.status(400)
            throw new Error("Limit tem que ser um number");
        }
        if (typeof offset !== "number") {
            res.status(400)
            throw new Error("Offset tem que ser um number");
        }
        if (!name) {
            const [count] = await db("users").count("name")
            const result: TUser[] | undefined[] = await db("users")
                .select("id", "name", "email", "password", "create_at AS createAt", "modified_at AS modifiedAt")
                .offset(offset)
                .limit(limit)
            res.status(200).send({ count: count["count(`name`)"], result })
        } else {
            const [count] = await db("users")
                .where("name", "LIKE", `%${name}%`)
                .count("name")
            const result = await db("users")
                .select("id", "name", "email", "password", "create_at AS createAt", "modified_at AS modifiedAt")
                .where("name", "LIKE", `%${name}%`)
                .offset(offset)
                .limit(limit)
            res.status(200).send({ count: count["count(`name`)"], result })
        }

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})
//addNewUser
app.post('/users', async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body as TUser
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

        const [avalibleID] = await db("users").where({ id: id })

        if (avalibleID) {
            res.status(422)
            throw new Error("Id ja utilizado em outro usuario");

        }
        const [avalibleEmail] = await db("users").where({ email: email })
        if (avalibleEmail) {
            res.status(422)
            throw new Error("Email ja utilizado em outro usuario");
        }

        if (!email.match(regexEmail)) {
            res.status(400)
            throw new Error("Email invalido");
        }
        if (!password.match(regexPassword)) {
            res.status(400)
            throw new Error("password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }

        const newUser = {
            id,
            name,
            email,
            password,
            modified_at: new Date(Date.now()).toUTCString(),
            create_at: new Date(Date.now()).toUTCString()
        }

        await db("users").insert(newUser)

        res.status(201).send({ message: "User criado com sucesso", newUser })

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }

})
//removeUserByID
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [user] = await db("users").where({ id: id })

        if (user) {
            const [purchaseID] : TPurchase[] | undefined= await db("purchases").where({buyer_id:id})
            if(purchaseID){
                await db("purchase_products").del().where({purchase_id:purchaseID.id})
                await db("purchases").del().where({id:purchaseID.id})
            }
            await db("users").del().where({ id: id })
            res.status(200).send({ message: "User apagado com sucesso", userRemoved: user })
        } else {
            res.status(404).send({ message: "Usuario não encontrado" })
        }


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }

})
//editUserById
app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email, password } = req.body as TUser


        if (email !== undefined) {
            if (typeof email !== 'string') {
                res.status(400)
                throw new Error("Email deve ser uma string");
            }
            if (!email.match(regexEmail)) {
                res.status(400)
                throw new Error("Email invalido");
            }
        }
        if (password !== undefined) {
            if (typeof password !== 'string') {
                res.status(400)
                throw new Error("Password deve ser uma string");
            }
            if (!password.match(regexPassword)) {

                res.status(400)
                throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
            }
        }
        const [user]: TUser[] = await db("users").where({ id: id })

        const updateUser = {
            email: email || user.email,
            password: password || user.password,
            modified_at: new Date(Date.now()).toUTCString()
        }
        if (user) {
            await db("users").update(updateUser).where({ id: id })
            res.status(200).send({ message: "Cadastro atualizado com sucesso", updateUser })
        } else {
            res.status(404).send({ message: "Usuario não encontrado" })
        }
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})


//Products****************************************************
app.get('/products', async (req: Request, res: Response) => {
    try {
        const name = req.query.name
        let limit = Number(req.query.limit) as number | undefined
        let offset = Number(req.query.offset) as number | undefined

        if (!limit) {

            limit = 20
        }
        if (!offset) {
            offset = 0
        }
        if (typeof limit !== "number") {
            res.status(400)
            throw new Error("Limit tem que ser um number");
        }
        if (typeof offset !== "number") {
            res.status(400)
            throw new Error("Offset tem que ser um number");
        }
        if (!name) {
            const [count] = await db("products").count("name")
            const result: TProduct[] | undefined[] = await db("products")
                .select("id", "name", "price", "description", "url_image AS urlImage", "create_at AS createAt", "modified_at AS modifiedAt", "category")
                .offset(offset)
                .limit(limit)
            res.status(200).send({ count: count["count(`name`)"], result })
        } else {
            const [count] = await db("products")
                .where("name", "LIKE", `%${name}%`)
                .count("name")
            const result: TProduct[] | undefined[] = await db("products")
                .select("id", "name", "price", "description", "url_image AS urlImage", "create_at AS createAt", "modified_at AS modifiedAt", "category")
                .where("name", "LIKE", `%${name}%`)
                .offset(offset)
                .limit(limit)
            res.status(200).send({ count: count["count(`name`)"], result })
        }

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})

app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [avalibleID]: TProduct[] = await db("products")
            .select("id", "name", "price", "description", "url_image AS urlImage", "create_at AS createAt", "modified_at AS modifiedAt", "category")
            .where({ id: id })

        if (avalibleID) {
            res.status(200).send(avalibleID)
        } else {
            res.status(404).send({ message: "Produto não encontrado" })
        }


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }

})

app.post('/products', async (req: Request, res: Response) => {

    try {
        const { id, name, price, description, urlImage, category } = req.body as TProduct

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
        if (typeof description !== "string") {
            res.status(400)
            throw new Error("Description tem que ser uma string");
        }
        if (typeof urlImage !== "string") {
            res.status(400)
            throw new Error("urlImage tem que ser uma string");
        }

        if (category !== Category.ACCESSORIES &&
            category !== Category.CLOTHES_AND_SHOES &&
            category !== Category.ELECTRONICS) {
            res.status(400)
            throw new Error(`Catgegoria tem que ser, ${Category.ACCESSORIES}, ${Category.CLOTHES_AND_SHOES} ou ${Category.ELECTRONICS}`);
        }
        const [avalibleID]: TProduct[] | undefined[] = await db("products").where({ id: id })
        if (avalibleID) {
            res.status(422)
            throw new Error("Id de produto tem que ser unico");
        }

        const newProduct = {
            id,
            name,
            price,
            description,
            url_image: urlImage,
            create_at: new Date(Date.now()).toUTCString(),
            modified_at: new Date(Date.now()).toUTCString(),
            category
        }

        await db("products").insert(newProduct)

        res.status(201).send({ message: "Produto criado com sucesso", newProduct })

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }

})

app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [product]: TProduct[] | undefined[] = await db("products").where({ id: id })

        if (product) {
            await db("products").del().where({ id: id })
            res.status(200).send({ message: "Produto apagado com sucesso", deletedProduct: product })

        } else {
            res.status(404).send({ message: "Produto não encontrado" })
        }


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }

})



app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { name, price, description, urlImage, category } = req.body as TProduct


        if (name !== undefined) {
            if (typeof name !== 'string') {
                res.status(400)
                throw new Error("Name deve ser uma string");
            }
            if (name.length < 1) {
                res.status(400)
                throw new Error("Name deve ter pelo menos 1 character");
            }
        }
        if (price !== undefined) {
            if (typeof price !== 'number') {
                res.status(400)
                throw new Error("Price deve ser um number");
            }
            if (price < 0) {
                res.status(400)
                throw new Error("Price não pode ser negativo");
            }
        }
        if (category !== undefined) {
            if (category !== Category.ACCESSORIES &&
                category !== Category.CLOTHES_AND_SHOES &&
                category !== Category.ELECTRONICS) {
                res.status(400)
                throw new Error(`Catgegoria tem que ser, ${Category.ACCESSORIES}, ${Category.CLOTHES_AND_SHOES} ou ${Category.ELECTRONICS}`);
            }
        }

        const [product]: TProduct[] | undefined[] = await db("products").where({ id: id })
        if (product) {
            const updatedProduct = {
                name: name || product.name,
                price: isNaN(price) ? product.price : price,
                description: description || product.description,
                url_image: urlImage || product.urlImage,
                modified_at: new Date(Date.now()).toUTCString(),
                category: category || product.category
            }

            await db("products").update(updatedProduct).where({ id: id })

            res.status(200).send({ message: "Produto atualizado com sucesso", updatedProduct })
        } else {
            res.status(404).send({ message: "Produto não encontrado" })
        }
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})


//purchase************************************************************
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const {id, buyerID} = req.body

        const products = req.body.products as TPurchaseProduct[]
        let totalPrice = 0

        if (typeof buyerID !== 'string') {
            res.status(400)
            throw new Error("buyerID tem que ser uma string");
        }
        if (typeof id !== 'string') {
            res.status(400)
            throw new Error("id tem que ser uma string");
        }

        const purchase = {
            id,
            buyer_id: buyerID,
            create_at: new Date(Date.now()).toUTCString(),
            total_price: totalPrice
        }


        const [avaliblePurID]: TPurchase[] | undefined[] = await db("purchases").where({ id: id })

        if (avaliblePurID) {
            res.status(422)
            throw new Error("Purchase com id ja existente");
        }

        if (typeof products !== "object") {
            res.status(400)
            throw new Error("products tem que ser uma array de objetos não vazio com propriedade productID e quantidade");
           
        } else {
            if (products.length <= 0) {
                res.status(400)
                throw new Error("É necessario ter ao menos uma compra");
            }
            for (let i = 0; i < products.length; i++) {
                const [avalibleProduct] :TProduct[] | undefined[]  = await db("products").where({ id: products[i].productID })

                if(typeof products[i].productID === "undefined"){
                    res.status(400)
                    throw new Error("products tem que ser uma array de objetos não vazio com propriedade productID e quantidade");
                    
                }
                if (!avalibleProduct) {
                    res.status(404)
                    throw new Error("Produto não encontrado");
                }
                if (typeof products[i].productID !== "string") {
                    res.status(400)
                    throw new Error("produto id precisa ser uma string");
                }
                if (typeof products[i].quantity !== "number" || products[i].quantity <= 0) {
                    res.status(400)
                    throw new Error("Quantidade da compra precisa ser um numero e maior que 0");

                }

            }
          
         
        }

       

        const [avalibleID]: TUser[] | undefined[] = await db("users").where({ id: buyerID })
        if (!avalibleID) {
            res.status(400)
            throw new Error("Não foi possivel achar o usuario pelo ID");
        }




        await db("purchases").insert(purchase)


        for (let i in products) {
            if(typeof products[i].productID === "undefined"){
                res.status(400)
                throw new Error("products tem que ser uma array de objetos não vazio com propriedade productID e quantidade");
                
            }
            const purchaseProducts = {
                purchase_id: id,
                product_id: products[i].productID,
                quantity: products[i].quantity
            }
            await db("purchase_products").insert(purchaseProducts)
            const [produto] : TProduct[]  = await db("products").select("price").where({ id: purchaseProducts.product_id })
            totalPrice += purchaseProducts.quantity * produto.price
        }

        await db("purchases").update({ total_price: totalPrice }).where({ id: id })

        const produtos : TProduct[] = await db("products")
            .select("id", "name", "price", "description", "url_image AS urlImage", "quantity")
            .innerJoin("purchase_products", "products.id", "=", "purchase_products.product_id")
            .where({ purchase_id: id })

        const newPurchase = {
            id,
            buyerID: purchase.buyer_id,
            createAt: purchase.create_at,
            totalPrice
        }

        res.status(201).send(
            {
                messgae: "Compra realizada com sucesso",
                newPurchase: { ...newPurchase, products: produtos }
            }
        )


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }

})

//Editar purchases
app.put('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { paid, isDelivered } = req.body
        const [purchase]: TPurchase[] | undefined[] = await db("purchases")
            .select("id", "buyer_id AS buyerID", "total_price AS totalPrice", "paid", "delivered_at AS deliveredAt", "create_at AS createAt")
            .where({ id: id })

        if (!purchase) {
            res.status(404)
            throw new Error("Purchase não encontrada");
        }
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id deve ser uma string");
        }
        if (!isNaN(paid)) {
            if (paid > 1 || paid < 0) {
                res.status(400)
                throw new Error("paid tem que  0(false) ou 1(true)");
            }
        } else {
            res.status(400)
            throw new Error("paid tem que ser um numero, 0(false) ou 1(true)");
        }
        if (typeof isDelivered !== "undefined") {
            if (typeof isDelivered !== "boolean") {
                res.status(400)

                throw new Error("isDelivred tem quer um booleano para uma padronização da data ser feita automaticamente");
            }
        }
        const updatedPurchase = {
            paid: isNaN(paid) ? purchase.paid : paid,
            delivered_at: isDelivered ? new Date(Date.now()).toUTCString() : null
        }
        const result = { ...purchase, paid: updatedPurchase.paid, deliveredAt: updatedPurchase.delivered_at }

        await db("purchases").update(updatedPurchase).where({ id: id })
        res.status(200).send({ message: "Purchase atualizada com sucesso", result })


    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})

app.get('/user/:id/purchases/', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result: TPurchase[] | undefined[] = await db("purchases")
            .select("id", "buyer_id AS buyerID", "total_price AS totalPrice", "paid AS isPAid", "delivered_at AS deliveredAt", "create_at AS createAt")
            .where({ buyer_id: id })

        const [avalibleID] = await db("users").where({ id: id })
        if (!avalibleID) {
            res.status(400)
            throw new Error("Usuario não encontrado");
        }
        if (result.length > 0) {
            res.status(200).send(result)
        } else {
            res.status(404).send({ message: "Esse usuario não possui compras" })
        }
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})

app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [purchase]: TPurchase[] | undefined[] = await db("purchases").where({ id: id })
        if (purchase) {

            const [cart] = await db("purchases")
                .select(
                    "purchases.id AS purchaseID",
                    "purchases.total_price AS totalPrice",
                    "purchases.create_at AS createdAt",
                    "purchases.paid",
                    "purchases.delivered_at AS deliveredAt",
                    "users.id AS buyerID",
                    "users.email",
                    "users.name")
                .innerJoin("users", "purchases.buyer_id", "=", "users.id")
                .where({ "purchases.id": id })

            const purchaseProducts = await db("purchase_products")
                .select("purchase_products.product_id AS id",
                    "products.name",
                    "products.price",
                    "products.description",
                    "products.url_image AS urlImage",
                    "purchase_products.quantity")
                .innerJoin("products", "products.id", "=", "purchase_products.product_id")
                .where({ purchase_id: id })

            const result = { ...cart, productsList: purchaseProducts }

            res.status(200).send(result)

        } else {
            res.status(404)
            throw new Error("Compra não encontrada");

        }

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})



app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("Id precisa ser um string");
        }
        if (id[0] !== "c") {
            res.status(400)
            throw new Error("Id de purchases precisa comecar com c");
        }
        await db("purchase_products").del().where({ purchase_id: id })  
        await db("purchases").del().where({ id: id })
        res.status(200).send({ message: "Purchase apgada com sucesso" })

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send({ message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
})
