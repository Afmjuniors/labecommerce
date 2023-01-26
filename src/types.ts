import { type } from "os"

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

