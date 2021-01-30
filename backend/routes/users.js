const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users/', getUsers);
router.get('/users/me', getUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(true),
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }).unknown(true),
}), updateUserAvatar);
module.exports = router;
