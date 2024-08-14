import express from 'express';
import dotenv from 'dotenv';
import MovieRouter from './routers/movieRouter.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 7878;

// App Creation
const app = express();
app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json());
app.use('/api', MovieRouter);

const sartApp = async () => {
  try {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'prod') {
        console.log(`Server is running in production mode on port ${PORT}`);
      } else {
        console.log(`Server is running in development mode on port ${PORT}`);
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error connecting to database', error.message);
    }
  }
};

sartApp();
