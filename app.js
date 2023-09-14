require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const { celebrate, Joi, errors } = require('celebrate');

const app = express();

app.use(cors({
  origin: ['https://eivom.nomoreparties.co', 'http://localhost:3000', 'http://eivom.nomoreparties.co'],
}));

const { PORT = 3000 } = process.env;

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { register, login } = require('./controllers/user');

const NotFindError = require('./utils/notFindError');

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('All is fine');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), register);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.use(auth);

app.use(require('./routes/index'));

app.use('*', (req, res, next) => {
  next(new NotFindError('Данная страница не найдена'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
