import express, { Express, Request, Response} from 'express';

const app: Express = express();

app.use(express.json());

interface IUser {
    id: number;
    name: string;
    email: string;
}

let users = [
    {id: 1,
    name: 'Jaquim',
    email: 'jaquimcouves@gmail.com'},

    {id: 2,
    name: 'Josefina',
    email: 'finagrega@gmail.com'}
]

app.get('/users', (req: Request, res:Response) => {
    res.json(users)
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});