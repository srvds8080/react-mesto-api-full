const router = require('express').Router();
const {
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateUserAvatar);
module.exports = router;
