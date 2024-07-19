import express, {Express} from 'express';
import userRouter from './routers/usersRouter.js';
import productsRouter from './routers/products.Router.js';

const app: Express = express();

app.use(express.json());
app.use(userRouter);
app.use(productsRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});