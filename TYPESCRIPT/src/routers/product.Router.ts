import { Router } from 'express';
import productsController from '../controllers/productController.js';

const router: Router = Router();

// Get all users
router.get('/products', productsController.getAll);
// Get user by id
router.get('/products/:id', productsController.getOne)
// Create a new user
router.post('/products/', productsController.create)
// Update an existing user 
router.put('/products/:id', productsController.update)
// Delete an existing 
router.delete('/products/:id', productsController.delete)

export default router;

// Get all users
// router.get('/users', (req: Request, res: Response) => {
//     console.log('Request Method', req.method);
//     console.log('Request URL', req.originalUrl);
//     console.log('Query Parameters', req.query);

//     if (users.length === 0) {
//         res.statusMessage = 'No users found';
//         res.sendStatus(204);
//     } else {
//         res.json(users);
//     }
// });

// Get user by id
// router.get('/users/:id', (req: Request, res: Response) => {
//     const userId: number = parseInt(req.params.id);
//     const foundUser = users.find(user => user.id === userId);

//     if (!foundUser){
//         res.status(404).json({error: 'User not found'});
//     }

//     res.json(foundUser);
// });

// Create a new user
// router.post('/users/', (req: Request, res: Response) => {
//     console.log('Request Body', req.body);

//     const newUser: IUser= {
//         id: users.length + 1,
//         name: req.body.name,
//         email: req.body.email
//     };

//     users.push(newUser);
//     res.status(201).json(newUser);
// });

// Update an existing user 
// router.put('/users/:id', (req: Request, res: Response) => {
//     const userId: number = parseInt(req.params.id);
//     const foundUser: IUser | undefined = users.find(user => user.id === userId);

//     if (!foundUser){
//         res.status(404).json({error: 'User not found'});
//     }else {
//         foundUser.name = req.body.name;
//         foundUser.email = req.body.email;
//         foundUser.password = req.body.password;
//     }
//     res.json(foundUser);
// });

// Delete an existing 
// router.delete('/users/:id', (req: Request, res: Response) => {
//     const userId: number = parseInt(req.params.id);
//     const foundUser: IUser | undefined = users.find(user => user.id === userId);

//     if (!foundUser){
//         res.status(404).json({error: 'User not found'});
//     }else {
//         users = users.filter((user) => user.id !== userId);
//     }
//     res.json(foundUser);
// });

// Endpoint Search - GET"/search?email=alex@gmail.com"

// export default router;