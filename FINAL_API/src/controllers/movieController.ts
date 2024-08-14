import { Request, Response, NextFunction } from 'express';
import IMovie from '../interfaces/movieInterface.js';

class MovieController {
  async getAll(req: Request, res: Response, next: NextFunction) {}
  async getOne(req: Request, res: Response, next: NextFunction) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, releaseDate, trailerLink, posterUrl, genders } = req.body;

      const newMovie = {
        title,
        releaseDate,
        trailerLink,
        posterUrl,
        genders,
      } as IMovie;

      const createdMovie = newMovie;

      res.status(201).json(createdMovie);
    } catch (error) {
      console.log(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {}
  async delete(req: Request, res: Response, next: NextFunction) {}
}

export default new MovieController();
