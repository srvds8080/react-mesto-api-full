require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.post('/sign-in', login);
app.post('/sign-up', createUser);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

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
