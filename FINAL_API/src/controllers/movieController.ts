import { Request, Response, NextFunction } from 'express';
import MovieService from '../services/movieService.js';

export class MovieController {
  async getAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await MovieService.getAll();
      res.json(movies);
    } catch (error: unknown) {
      next(error);
    }
  }

  async createNewMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.create(req.body);
      res.status(201).json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.update(req.params.id, req.body);
      res.json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    try {
      await MovieService.delete(req.params.id);
      res.json({ message: 'Movie deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new MovieController();
export const getAllMovies = new MovieController().getAllMovies;
export const createNewMovie = new MovieController().createNewMovie;
export const updateMovie = new MovieController().updateMovie;
export const deleteMovie = new MovieController().deleteMovie;
