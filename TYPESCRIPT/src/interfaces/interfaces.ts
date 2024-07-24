export interface IUser {
    id: number;
    email: string;
    password?: string;
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