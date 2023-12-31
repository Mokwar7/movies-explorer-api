const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/', getAllMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    trailerLink: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/), // eslint-disable-line no-useless-escape
    movieId: Joi.number().required(),
  }),
}), createMovie);
router.get('/:id', deleteMovie);

module.exports = router;
