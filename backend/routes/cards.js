const router = require('express').Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/likes/:cardId', putLike);
router.delete('/cards/likes/:cardId', removeLike);

module.exports = router;
