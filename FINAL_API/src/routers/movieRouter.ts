import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { getAllMovies, getMovieFilter, createNewMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';

const router = express.Router();

router.get('/movies', protect, getAllMovies);
router.get('/movies/search', protect, getMovieFilter);
router.post('/movies', protect, admin, createNewMovie);
router.put('/movies/:id', protect, admin, updateMovie);
router.delete('/movies/:id', protect, admin, deleteMovie);

export default router;
