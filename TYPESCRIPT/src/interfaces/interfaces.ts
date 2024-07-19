export interface IUser {
    id: number;
    name: string;
    email: string;
    password?: string;
}

export interface IProduct {
    id: number,
    title: string,
    description?: string,
    category: string,
    price: number,
    brand: string,
    sku: string,
    image: string
}