import { getAllProducts, getAllPurchasesFromUserId, getAllUsers, products, purchaseHistory, queryProductsByName, users, getProductById } from "./database"
import { Category, TProduct, TPurchase, TPurchaseProduct, TUser } from "./types"
import express, { Request, Response } from "express"
import cors from 'cors'
import { send } from "process"
import { db } from "./database/knex"




const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log(`serviddor rodando na porta 3003`)
})

app.get('/ping',  async (req: Request, res: Response) => {
    res.send('servidor rodando')
})





//users*************************************************
app.get('/users', async (req: Request, res: Response) => {
    try {

        const result = await db("users")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
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
        
        const [avalibleID] = await db("users").where({id:id})
 
        if (avalibleID) {
            res.status(422)
            throw new Error("Id ja utilizado em outro usuario");

        }
        const [avalibleEmail] = await db("users").where({email:email})
        if (avalibleEmail) {
            res.status(422)
            throw new Error("Email ja utilizado em outro usuario");

        }
        const newUser = {
            id,
            name,
            email,
            password
        }
      
        await db("users").insert(newUser)

        res.status(201).send("User criado com sucesso")

    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
//removeUserByID
app.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [user] = await db("users").where({id:id})

        if (user) {
             await db("users").del().where({id:id})
            res.status(200).send("User apagado com sucesso")
        } else {
            res.status(404).send("Usuario não encontrado")
        }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
//editUserById
app.put('/user/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { email, password } = req.body
    

        if (email !== undefined) {
            if (typeof email !== 'string') {
                res.status(400)
                throw new Error("Email deve ser uma string");
            }
            if (email.length < 6) {
                res.status(400)
                throw new Error("Email deve ter pelomenos 6 caracteres");
            }
            if (!email.includes("@")) {
                res.status(400)
                throw new Error("Email deve ter @");
            }

        }
        if (password !== undefined) {
            if (typeof password !== 'string') {
                res.status(400)
                throw new Error("Password deve ser uma string");
            }
            if (password.length < 4) {
                res.status(400)
                throw new Error("Password deve ter pelomenos 4 caracteres");
            }
        }
        const [user] = await db("users").where({id:id})

        const updateUser ={
            email:email || user.email,
            password: password || user.password
        }
        if (user) {
            await db("users").update(updateUser).where({id:id})    
            res.status(200).send("Cadastro atualizado com sucesso")
        } else {
            res.status(404).send("Usuario não encontrado")
        }
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//Products****************************************************
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("products")
        res.status(200).send(result)


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
//getProductByName
app.get('/products/search', async (req: Request, res: Response) => {
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
      const result =  await db("products").where("name", "LIKE", `%${name}%`)


        res.status(200).send(result)


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
app.get('/product/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [avalibleID] = await db("products").where({id:id})
        
        if (avalibleID) {
            res.status(200).send(avalibleID)
        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
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
        if(typeof description!=="string"){
            res.status(400)
            throw new Error("Description tem que ser uma string");
        }
        if(typeof urlImage!=="string"){
            res.status(400)
            throw new Error("urlImage tem que ser uma string");
        }


        if (category !== Category.ACCESSORIES &&
            category !== Category.CLOTHES_AND_SHOES &&
            category !== Category.ELECTRONICS) {
            res.status(400)
            throw new Error(`Catgegoria tem que ser, ${Category.ACCESSORIES}, ${Category.CLOTHES_AND_SHOES} ou ${Category.ELECTRONICS}`);
        }
        const [avalibleID] = await db("products").where({id:id})
        if (avalibleID) {
            res.status(422)
            throw new Error("Id de produto tem que ser unico");
        }
        const newProduct = {
            id,
            name,
            price,
            description,
            url_image:urlImage,
            category
        }



        await db("products").insert(newProduct)
   
       
        res.status(201).send("Produto criado com sucesso")


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.delete('/product/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [indexProduct] = await db("products").where({id:id})

        if (indexProduct) {
            await db.raw(`DELETE FROM products WHERE id="${id}";`)
            res.status(200).send("Produto apagado com sucesso")

        } else {
            res.status(404).send("Produto não encontrado")
        }


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})



app.put('/product/:id',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const {name, price, description, urlImage, category} = req.body
    

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

        const [product] = await db.raw(`SELECT * FROM products WHERE id="${id}";`)
        if (product) {
            const updateProduct = {
                name:name || product.name,
                price: isNaN(price)?product.price : price,
                url_image:urlImage || product.url_image,
                modified_at: new Date(),
                category:category|| product.category
            }

            await db("products").update(updateProduct).where({id:id})

            res.status(200).send("Produto atualizado com sucesso")
        } else {
            res.status(404).send("Produto não encontrado")
        }
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//purchase************************************************************
app.post('/purchase',  async (req: Request, res: Response) => {
    try {
        const {id, buyerID } = req.body as TPurchase     

        if (typeof buyerID !== 'string') {
            res.status(400)
            throw new Error("buyerID tem que ser uma string");
        }
        
        const [avalibleID] = await db("users").where({id:buyerID})
        if (!avalibleID) {
            res.status(400)
            throw new Error("Não foi possivel achar o usuario pelo ID");
        }
        const newPurchase ={
            id,
            buyer_id:buyerID
        }

        await db("purchases").insert(newPurchase)

        res.status(201).send("Compra realizada com sucesso")


    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
//CRIAR uma purchase_product
app.post('/purchase/:id' ,async (req:Request, res:Response)=>{
    try {
        const purchaseID = req.params.id
        const {productID, quantity} = req.body
        const [product] = await db("products").where({id:productID})
        let subTotal = 0;
        if(purchaseID[0]!=="c"){
            res.status(404)
            throw new Error("Id da compra comeca com c");
        }
        if(!product){
            res.status(404)
            throw new Error("Produto não encontrado");
        }else{
            subTotal = product.price * quantity
        }
        if(quantity<1){
            res.status(400)
            throw new Error("Quantidade tem que ser maior que 1");
        }
        const newPurchaseProduct = {
            purchase_id:purchaseID,
             product_id:productID,
             quantity,
             subtotal:subTotal
        }
        await db("purchases_products").insert(newPurchaseProduct)

        res.status(201).send("Purchase criada")

    } catch (error:any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put('/purchase/:id',async (req: Request, res: Response) =>{
    try {
        const id = req.params.id
        const purchasesProduct = await db("purchases_products").where({purchase_id:id})
        console.log(purchasesProduct)
        if(purchasesProduct.length>0){
        const totalPrice = purchasesProduct.reduce((acc,prod)=>acc+prod.subtotal,0)
        
        await db("purchases").update({total_price:totalPrice}).where({id:id})
        res.status(200).send("Atualizado com sucesso")

        }else{
            res.status(400)
            throw new Error("Nenhum produto");
            
        }
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
} )

app.get('/user/:id/purchase/',  async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = await db("purchases").where({buyer_id:id})

        const [avalibleID] = await db("users").where({id:id})
        if (!avalibleID) {
            res.status(400)
            throw new Error("Usuario não encontrado");
        }
        if (result.length > 0) {
            res.status(200).send(result)
        } else {
            res.status(404).send("Esse usuario não possui compras")
        }
    } catch (error: any) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [purchase] = await db("purchases").where({id:id})
        if(purchase){
            
            const [cart] = await db("purchases")
            .select(
                "purchases.id AS purchaseID",
                "purchases.total_price AS totalPrice",
                "purchases.create_at AS createdAt",
                "purchases.paid AS isPaid",
                "users.id AS buyerID",
                "users.email",
                "users.name")
            .innerJoin("users","purchases.buyer_id","=","users.id")
            const purchaseProducts = await db("purchases_products")
            .select("purchases_products.product_id AS id",
            "products.name",
            "products.price",
            "products.description",
            "products.url_image AS urlImage",
            "purchases_products.quantity")
            .innerJoin("products","products.id","=","purchases_products.product_id")
            const result = {...cart,productsList:purchaseProducts}
            
            console.log(result)
            res.status(200).send(result)

        }else{
            res.status(404)
            throw new Error("Compra não encontrada");
            
        }
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.delete('/purchases/:id', async(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        if(typeof id !== "string"){
            res.status(400)
            throw new Error("Id precisa ser um string");            
        }
        if(id[0]!=="c"){
            res.status(400)
            throw new Error("Id de purchases precisa comecar com c");
        }
        await db("purchases_products").del().where({purchase_id:id})
        await db("purchases").del().where({id:id})
        res.status(200).send("Purchase apgada com sucesso")
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
