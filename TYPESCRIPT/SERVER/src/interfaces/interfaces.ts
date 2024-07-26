export interface IUser {
    id: string;
    email: string;
    password: string;
}

export interface IProduct {
    id: string,
    title: string,
    description?: string,
    category: string,
    price: number,
    brand: string,
    sku: string,
    image: string
}