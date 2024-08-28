import { Request, Response, NextFunction } from 'express';
import MovieService from '../services/movieService.js';

export class MovieController {
  async listMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await MovieService.getAll();
      res.json(movies);
    } catch (error: unknown) {
      next(error);
    }
  }

  async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.create(req.body);
      res.status(201).json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  async editMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.update(req.params.id, req.body);
      res.json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  async removeMovie(req: Request, res: Response, next: NextFunction) {
    try {
      await MovieService.delete(req.params.id);
      res.json({ message: 'Movie deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new MovieController();
