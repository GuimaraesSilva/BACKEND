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
    update = (productId: string, product: IProduct): IProduct | undefined => {
        try {
            const products = this.readProductsJson();
            if (!products){
                throw new Error('Failed to read products');
            }
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex === -1){
                // throw new Error ('Product not found');
                return undefined;
            }
            const productToUpdateWithId = {...products[productIndex], ...product}; // Merge product with id
            products[productIndex] = productToUpdateWithId; // Update Product
            this.writeProductsJson(products);
            return productToUpdateWithId;

        } catch (error) {
            throw new Error ('Failed to update product');
        }
    }
    delete = (productId: string): IProduct | undefined => {
        try {
            const products: IProduct[] | undefined = this.readProductsJson();
            if (!products){
                throw new Error('Failed to read products');
            }
            const productIndex = products.findIndex(product => product.id === productId);
            if (productIndex === -1){
                // throw new Error ('Product not found');
                return undefined;
            }
            const arr = products.splice(productIndex, 1);
            const deletedProduct = arr[0]; // Delete product
            this.writeProductsJson(products);
            return deletedProduct;
            
        } catch (error) {
            throw new Error ('Failed to delete product');
        }
    }
}

export default new ProductService();
