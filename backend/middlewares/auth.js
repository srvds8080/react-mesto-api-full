const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new ForbiddenError('Необходима авторизация');
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const error = new ForbiddenError('Необходима авторизация');
    return next(error);
  }
  req.user = payload;

  return next();
};
