import mongoose from 'mongoose';
import Movie from '../models/movieModel.js';
import IMovie from '../interfaces/movieInterface.js';

class MovieService {
  async getAll() {
    return await Movie.find();
  }

  async getOne(id: string) {
    return await Movie.findById(id);
  }

  async create(movieData: IMovie) {
    return await Movie.create(movieData);
  }

  async update(id: string, movieData: Partial<IMovie>) {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
  }

  async delete(id: string) {
    return await Movie.findByIdAndDelete(id);
  }
}

export default new MovieService();
