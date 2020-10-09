import * as Yup from 'yup';

import Movie from '../models/Movie';
import User from '../models/User';
class MoviesController {
  async index(req, res) {
    try {
      let filter = {};
      req.query.name ? (filter.name = req.query.name) : null;
      req.query.director ? (filter.director = req.query.director) : null;
      req.query.genre ? (filter.genre = req.query.genre) : null;

      const result = await Movie.findAll({
        where: filter,
      });

      if (result) {
        return res.status(200).json(result);
      }

      const data = await Movie.findAll();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(401).json({ error: 'Movie not found' });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      director: Yup.string().required(),
      genre: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkIsAdmin = await User.findOne({
      where: { id: req.userId, admin: true, status: true },
    });

    if (!checkIsAdmin) {
      return res
        .status(401)
        .json({ error: 'only administrator actived can register movies' });
    }

    const { name, director, genre } = req.body;

    const movie = await Movie.create({
      admin_id: req.userId,
      name,
      director,
      genre,
    });

    return res.json(movie);
  }

  async vote(req, res) {
    const schema = Yup.object().shape({
      movie_note: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'movie_note is required' });
    }
    const { movie_id } = req.params;

    const movie = await Movie.findByPk(movie_id);

    if (!movie) {
      return res.status(401).json({ error: 'Movie not found' });
    }

    const { movie_note } = req.body;

    if (movie_note > 4 || movie_note < 0) {
      return res.status(401).json({ error: 'the allowed vote is 0 to 4' });
    }

    const resultSum = parseFloat(movie.movie_note) + parseFloat(movie_note);
    const quantityPlus = (movie.vote_quantity += 1);
    const media = resultSum / quantityPlus;
    const resultMedia = media.toFixed(1);

    const data = {
      movie_note: resultMedia,
      vote_quantity: quantityPlus,
    };
    await movie.update(data);

    return res.json(movie);
  }
}

export default new MoviesController();
