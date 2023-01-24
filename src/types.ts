export type TUser = {
    id: string,
    name:string,
    email: string,
    password: string,
    modifiedAt:string,
    createAt: string,
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string,
    urlImage:string,
    modifiedAt:string,
    createAt: string,
    category: Category
}

export type TPurchase = {
    id:string,
    buyerID: string,
    totalPrice: Number,
    paid:number,
    createAt:string,
    modifiedAt:string,
    deliveredAt:string
}

export type TPurchaseProduct ={
    purchaseId:string,
    productID:string,
    subTotal:number,
    quantity:number
}

export enum Category{
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}
/*




        SELET * FROM users
        const result = await db("users")


        INSERT INTO users (id,name,salary)
        VALUES(id,name,salary)
        const id = req.body.id
        const name = req.body.name
        const salary = req.body.salary
        const newUser = {
            id: id,
            name: name,
            salary: salary
        }
        await db("users").insert(newUser)


        DELETE FROM users WHERE id=id
        await db("users").del().where({ id: idToDelete })

        UPDATE users 
        SET
        WHERE

        const id = req.params.id
        const newId = req.body.id
        const newName = req.body.name
        const newSalary = req.body.salary
            const updatedUser = {
                id: newId || user.id,
            	name: newName || user.name,
            	salary: isNaN(newSalary) ? user.salary : newSalary
            }
        await db("users").update(updatedUser).where({ id: id })

       
*/