export interface IProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    brand: string;
    sku: string;
    image: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
}
