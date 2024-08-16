import mongoose from 'mongoose';
import IMovie from '../interfaces/movieInterface.js';
import MovieModel from '../models/movieModel.js';
import fileService from '../utils/fileService.js';

class MovieService {
  async getAll() {}
  async getOne() {}

  async create(movieData: IMovie, poster: any) {
    try {
        if (poster){
            const posterUrl = fileService.save(poster);
            movieData.posterUrl = posterUrl;
        }
      const createdMovie = new MovieModel(movieData);
      return await createdMovie.save();

    } catch (error) {
      console.log(error);
    }
  }

  async update() {}
  async delete() {}
}

export default new MovieService();
