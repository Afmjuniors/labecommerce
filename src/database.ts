import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "a",
        email: 'a@a.com',
        password: 'a'
    },
    {
        id: "b",
        email: 'b@b.com',
        password: 'bb'
    },

]

export const products: TProduct[] = [
    {
        id: '1',
        name: 'produto1',
        price: 10,
        category: 'categoria1'
    },
    {
        id: '2',
        name: 'produto2',
        price: 20,
        category: 'categoria2'
    },
]

export const purchaseHistory: TPurchase[] = [
    {
        userId: 'a',
        productId: '1',
        quantity: 1,
        totalPrice: 10
    },
    {
        userId: 'b',
        productId: '2',
        quantity: 2,
        totalPrice: 40
    },
]
