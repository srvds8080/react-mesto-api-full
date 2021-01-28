require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const { login, createUser } = require('./controllers/users.js');
// const { urlBD } = require('./utils/constants.js');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'http://localhost:5000',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, allowedCors);
  },
};

mongoose.connect('mongodb+srv://srvds:1234qwer@cluster0.vzqr2.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/sign-in',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
    }).unknown(true),
  }),
  login);
app.post('/sign-up',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
      about: Joi.string().min(2).max(30).default('Исследователь'),
      avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
      email: Joi.string().required().email(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
    }).unknown(true),
  }),
  createUser);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
