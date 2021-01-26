const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
// errors cods
const {
  OK_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CREATE_CODE,
  BAD_REQUEST_CODE,
  NOTFUOND_CODE,
  REGEX_URL,
} = require('../utils/constants');

const {
  catchError,
} = require('../utils/errors');

const getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(OK_CODE).send(users))
    .catch((error) => res.status(INTERNAL_SERVER_ERROR_CODE).send(error));
};

const getUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('Пользователь по заданному id отсутствует в базе');
      error.statusCode = NOTFUOND_CODE;
      throw error;
    })
    .then((user) => {
      res.status(OK_CODE).send(user);
    })
    .catch((error) => catchError(error, res));
};

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new Error('Пользователь существует'));
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
            .then((isUser) => {
              res.status(CREATE_CODE).send(isUser);
            })
            .catch((err) => {
              res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: err.message });
            });
        });
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: err.message }));
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || name < 2) {
    res.status(BAD_REQUEST_CODE).send({ message: 'Значение "name" обязательно и не может быть короче двух символов' });
  } else {
    User.findByIdAndUpdate(_id, { name, about }, { new: true })
      .orFail(() => {
        const error = new Error('Пользователь по заданному id отсутствует в базе');
        error.statusCode = NOTFUOND_CODE;
        throw error;
      })
      .then((user) => {
        res.status(OK_CODE).send(user);
      })
      .catch((error) => catchError(error, res));
  }
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  if (!REGEX_URL.test(avatar)) {
    res.status(BAD_REQUEST_CODE).send({ message: `${avatar} не является URL` });
  } else {
    User.findByIdAndUpdate(_id, { avatar }, { new: true })
      .then((user) => {
        if (!user) {
          res.status(NOTFUOND_CODE).send({ message: 'Пользователь по заданному id отсутствует в базе' });
          return;
        }
        res.status(OK_CODE).send(user);
      })
      .catch((error) => catchError(error, res));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
