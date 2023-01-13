import { Category, TProduct, TPurchase, TUser } from "./types";




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
        category: Category.ACCESSORIES
    },
    {
        id: '2',
        name: 'produto2',
        price: 20,
        category: Category.ELECTRONICS
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

export function getAllUsers(): Array<TUser> {
    return users
}

export function getUserById(id: string) {
    const user = users.find((user) => user.id === id)
    return user
}

export function getAllProducts(): Array<TProduct> {
    return products
}

export function getProductById(id: string) {
    return products.find((product) => product.id === id)
}


export function queryProductsByName(q: string): Array<TProduct> {
    return products.filter((product: TProduct) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
}


export function getAllPurchasesFromUserId(userId: string): Array<TPurchase> {
    return purchaseHistory.filter((purchase) => purchase.userId === userId)
}