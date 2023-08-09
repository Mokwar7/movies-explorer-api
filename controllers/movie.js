const Movie = require('../models/movie');
const { SUCCESS_CODE, CREATE_CODE } = require('../utils/codes');
const NotCorrectDataError = require('../utils/notCorrectDataError');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(SUCCESS_CODE).send({ data: movies });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body; // eslint-disable-line

  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id }) // eslint-disable-line
    .then((movie) => {
      res.status(CREATE_CODE).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;

  Movie.findByIdAndDelete({ movieId })
    .then((result) => {
      res.status(SUCCESS_CODE).send({ data: result });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new NotCorrectDataError('Data validation error'));
      }
      next(err);
    });
};
