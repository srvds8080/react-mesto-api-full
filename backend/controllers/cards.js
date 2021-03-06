const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');

// errors codes
const {
  OK_CODE,
  CREATE_CODE,
} = require('../utils/constants');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK_CODE).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  if (!link) {
    throw new BadRequestError('Ссылка на изобржение обязательна');
  } else if (!name || name.length < 2) {
    throw new BadRequestError('Значение "name" обязательно и не может быть короче двух символов');
  } else {
    Card.create({
      name,
      link,
      owner: {
        _id,
      },
    })
      .then((card) => res.status(CREATE_CODE).send({ data: card }))
      .catch((err) => {
        if (/Validator\sfailed\sfor\spath\s`link`/ig.test(err.message)) {
          throw new BadRequestError(`${link} не является действительной ссылкой на изображение`);
        }
      })
      .catch(next);
  }
};

const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Такой карточки не существует'));
      }
      if (card.owner.toString() !== _id) {
        return next(new ForbiddenError('Нельзя удалять чужие карточки!'));
      }
      return Card.findByIdAndRemove(cardId)
        .then(() => {
          res.status(OK_CODE).send({ message: 'Карточка успешно удалена' });
        })
        .catch(next);
    });
};

const putLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: [req.user._id] } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Такой карточки не существует');
    })
    .then((card) => {
      res.status(OK_CODE).send(card);
    })
    .catch(next);
};
const removeLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('такой карточки не существует');
    })
    .then((card) => {
      res.status(OK_CODE).send(card);
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
