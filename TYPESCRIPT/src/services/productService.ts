import { IProduct } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';
import {v4 as uuidv4} from 'uuid';

const productsFilePath = './src/data/products.json';

class ProductService {
    private readProductsJson(): IProduct[] | undefined{
        try {
            return JsonFileReader.read(productsFilePath);
        } catch (error) {
            throw new Error ('Failed to read products from file')
        }
    }
    private writeProductsJson(products: IProduct[]): void{
        try {
            JsonFileReader.write(productsFilePath, products);
        } catch (error) {
            throw new Error ('Failed to write products from file')
        }
        
    }

    getAll = async () => {
        try {
            return this.readProductsJson();
        } catch (error) {
            throw new Error('Failed to get all products');
        }
    }

    getProductByID = (productId: string): IProduct | undefined => {
        try {
            const products: IProduct[] | undefined = this.readProductsJson();
            const foundProduct = products?.find(product => product.id === productId);
            return foundProduct;
        } catch (error) {
            throw new Error('Failed to product by ID');
        }
    }
    create = (newProduct: IProduct): IProduct => {
        try {
            const products: IProduct[] | undefined = this.readProductsJson();
            newProduct.id = uuidv4();
            products?.push(newProduct);
            if(!products){
                throw new Error('Failed to read products');
            }
            this.writeProductsJson(products);

            return newProduct;
        } catch (error) {
            throw new Error('Failed to create products');
        }
    }
    update = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
    delete = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ProductService();
