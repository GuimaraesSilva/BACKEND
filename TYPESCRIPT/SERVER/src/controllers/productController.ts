// import { write } from 'fs';
import {Request, Response} from 'express';
import { IProduct } from '../interfaces/interfaces.js';
import productService from '../services/productService.js';
// import productService from '../services/productService.js';
// import JsonFileReader from '../utils/jsonFileReader.js';

const productsFilePath = './src/data/products.json';

class ProductController {
    getAll = async (req: Request, res: Response) => {
        try {
            const products: IProduct[] | undefined = await productService.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({error: 'Failed to get products'});
        }
    }
    getOne = async (req: Request, res: Response) => {
        try {
            const productId: string = req.params.id;
            const product: IProduct | undefined = productService.getProductByID(productId);
            if(!product){
                res.status(404).json({error: 'Product not found'});
            }
            res.json(product);
        } catch (error){
            console.log(error);
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const productToCreate: IProduct = req.body;
            const createdProduct: any = productService.create(productToCreate);
            res.status(201).json(createdProduct);
        } catch (error) {
            console.log(error);
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const productId: string = req.params.id;
            const productToUpdate: IProduct = req.body;
            const updateProduct: IProduct | undefined = productService.update(productId, productToUpdate);
            if (!updateProduct) {
                res.status(404).json({error: 'Product not found'});
            }
            res.json(updateProduct);
        } catch (error) {
            res.status(500).json({error: 'Failed to update products'});
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const productId: string = req.params.id;
            const deletedProduct: IProduct | undefined = productService.delete(productId);

            if (!deletedProduct) {
                res.status(404).json({error: 'Product not found'});
            }
            res.json(deletedProduct);
        } catch (error) {
            res.status(500).json({error: 'Failed to delete products'});
        }
    }
}

export default new ProductController();

    // INFORMATION TO KEEP

    // private readProducts(): IProduct[]{
    //     return JsonFileReader.read(productsFilePath)
    // }

    // private writeProducts(products: IProduct[]): void{
    //     return JsonFileReader.write(productsFilePath, products)
    // }

    // getAll(req: Request, res: Response){
    //     const products: IProduct[] = JsonFileReader.read(productsFilePath);
    //     res.json(products);
    // }

    // getOne(req: Request, res: Response){
    //     const productId: number = parseInt(req.params.id);
    //     const products: IProduct[] = JsonFileReader.read(productsFilePath);
    //     const foundProduct: IProduct|undefined 
    //         = products.find(product => product.id === productId);
    //     if (!foundProduct){
    //         res.status(404).json({error: 'Product not found'});
    //     }
    //     res.json(foundProduct);
    // }