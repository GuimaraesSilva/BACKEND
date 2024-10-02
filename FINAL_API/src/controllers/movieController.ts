import { Request, Response, NextFunction } from 'express';
import MovieService from '../services/movieService.js';

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Endpoints relacionados a filmes
 */
export class MovieController {
  /**
   * @swagger
   * /api/movies:
   *   get:
   *     summary: Busca lista de trailers de filmes com detalhes (Apenas usuários logados)
   *     tags: [Movies]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de filmes
   *       401:
   *         description: Não autorizado
   */
  async getAllMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await MovieService.getAll();
      res.json(movies);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/movies/search:
   *   get:
   *     summary: Busca lista de filmes com paginação, ordenação e filtros (Apenas usuários logados)
   *     tags: [Movies]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Limite de itens por página
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *         description: Campo para ordenação
   *       - in: query
   *         name: search
   *         schema:
   *           type: string
   *         description: Termo de busca
   *       - in: query
   *         name: genre
   *         schema:
   *           type: string
   *         description: Gênero do filme
   *     responses:
   *       200:
   *         description: Lista de filmes filtrada
   *       401:
   *         description: Não autorizado
   */
  async getMovieFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, sortBy = 'releaseDate', search, genre } = req.query;
      const filters: any = {};

      if (search) {
        filters.$or = [
          { title: { $regex: search, $options: 'i' } },
          { releaseDate: { $regex: search, $options: 'i' } },
          { genres: { $regex: search, $options: 'i' } },
        ];
      }

      if (genre) {
        filters.genres = { $regex: genre, $options: 'i' };
      }

      const movies = await MovieService.getFilteredMovies(filters, sortBy as string, Number(page), Number(limit));
      res.json(movies);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/movies:
   *   post:
   *     summary: Adiciona um novo filme (Apenas Admin)
   *     tags: [Movies]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - title
   *               - releaseDate
   *               - genres
   *             properties:
   *               title:
   *                 type: string
   *               releaseDate:
   *                 type: string
   *               genres:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       201:
   *         description: Filme adicionado com sucesso
   *       403:
   *         description: Acesso negado
   */
  async createNewMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.create(req.body);
      res.status(201).json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/movies/{id}:
   *   put:
   *     summary: Atualiza detalhes do filme (Apenas Admin)
   *     tags: [Movies]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do filme
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               releaseDate:
   *                 type: string
   *               genres:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Filme atualizado com sucesso
   *       403:
   *         description: Acesso negado
   */
  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = await MovieService.update(req.params.id, req.body);
      res.json(movie);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/movies/{id}:
   *   delete:
   *     summary: Deleta um filme (Apenas Admin)
   *     tags: [Movies]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do filme
   *     responses:
   *       200:
   *         description: Filme deletado com sucesso
   *       403:
   *         description: Acesso negado
   */
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
export const getMovieFilter = new MovieController().getMovieFilter;
export const createNewMovie = new MovieController().createNewMovie;
export const updateMovie = new MovieController().updateMovie;
export const deleteMovie = new MovieController().deleteMovie;
