import { write } from 'fs';
import {Request, Response} from 'express';
import { IProduct } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';

const productsFilePath = './src/data/products.json';

class ProductController {
    // private readProducts(): IProduct[]{
    //     return JsonFileReader.read(productsFilePath)
    // }

    // private writeProducts(products: IProduct[]): void{
    //     return JsonFileReader.write(productsFilePath, products)
    // }

    getAll(req: Request, res: Response){
        const products: IProduct[] = JsonFileReader.read(productsFilePath);
        res.json(products);
    }

    getOne(req: Request, res: Response){
        const productId: number = parseInt(req.params.id);
        const products: IProduct[] = JsonFileReader.read(productsFilePath);
        const foundProduct: IProduct|undefined 
            = products.find(product => product.id === productId);
        if (!foundProduct){
            res.status(404).json({error: 'Product not found'});
        }
        res.json(foundProduct);
    }

    create(req: Request, res: Response){
        // const newProduct: IProduct= {
        //     id: product.length + 1,
        //     name: req.body.name,
        //     email: req.body.email
        // };
    
        // product.push(newProduct);
        // res.status(201).json(newProduct);
    }

    update(req: Request, res: Response){}
    delete(req: Request, res: Response){}
}

export default new ProductController();