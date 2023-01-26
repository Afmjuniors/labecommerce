

//Purchases
/*
id
buyer_id
total_price
products  - [] {}
[
    {
    produtoID:p001

    quantity:1
    }
]


*/

import { db } from "./database/knex"

app.post("/purchases",async (req:Request, res:Response) => {
    try {
        const id = req.body.id
        const buyerID = req.body.buyerID
      
        const products = req.body.products


        // let totalPrice = 0
        
        const purchase = {
            id,
            buyer_id:buyerID,
            create_at: new Date(),
            total_price: 0
        }
 
        await db("purchases").insert(purchase)


        const purchaseProducts = {
            purchase_id:id,
            product_id:products.productID,
            quantity:products.quantity

        }






    } catch (error) {
        
    }
})