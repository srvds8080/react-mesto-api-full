const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const NotFoundError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedErrord = require('../errors/UnauthorizedError');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
// errors cods
const {
  OK_CODE,
  CREATE_CODE,
} = require('../utils/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователя не существует');
    })
    .then((user) => res.status(OK_CODE).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
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
        throw new ConflictError('Пользователь существует');
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
            .catch(next);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      const error = new UnauthorizedErrord('email или пароль неверные');
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || name < 2) {
    throw new BadRequestError('Значение "name" обязательно и не может быть короче двух символов');
  } else {
    User.findByIdAndUpdate(_id, { name, about }, { new: true })
      .orFail(() => {
        throw new NotFoundError('Пользователь по заданному id отсутствует в базе');
      })
      .then((user) => {
        res.status(OK_CODE).send(user);
      })
      .catch(next);
  }
};

const updateUserAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  if (!validator.isURL(avatar)) {
    throw new BadRequestError(`${avatar} не является URL`);
  } else {
    User.findByIdAndUpdate(_id, { avatar }, { new: true })
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Пользователь по заданному id отсутствует в базе');
        }
        res.status(OK_CODE).send(user);
      })
      .catch((error) => {
        if (error.name === 'CastError') {
          throw new BadRequestError('переданы некоректные данные');
        } else if (error.statusCode === 404) {
          throw new NotFoundError(error.message);
        }
      })
      .catch(next);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
