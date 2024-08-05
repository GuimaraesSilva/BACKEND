import { Router } from "express";

import ProductController from "../controllers/productController.js";
import { check } from "express-validator";

const router: Router = Router();

// let users: IProduct[] = JSON.parse(
//     readFileSync("./src/data/products.json", "utf-8")
// ); //importar o ficheiro JSON dos products

const validateProduct = [
    check("name").notEmpty().withMessage("Product name is required"),
    check("description")
        .notEmpty()
        .withMessage("Product description is required"),
    check("price").isNumeric().withMessage("Product must be an number"),
    check("ean")
        .optional()
        .isLength({ min: 13, max: 13 })
        .withMessage("EAN must be 13 digits long"),
    // check("image").custom((value, { req }) => {
    //     if (!req.files || !req.files.image) {
    //         throw new Error("Image is required");
    //     }

    //     return true;
    // }),
];
//Get all products
router.get("/products", ProductController.getAll);

// Get products by id
router.get("/products/:id", ProductController.getOne);

// Create a new product
router.post("/products", validateProduct, ProductController.create);

// Update an existing product
router.put("/products/:id", ProductController.update);

// Delete and existing product

router.delete("/products/:id", ProductController.delete);

// //Search by name

// router.get("/products/name/:name", (req: Request, res: Response) => {});

// let products: IProduct[] = JSON.parse(
//     readFileSync("./src/data/products.json", "utf-8")
// ); //importar o ficheiro JSON dos products

export default router;
