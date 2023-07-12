const Card = require('../models/card.js');
const SUCCESS_CODE = 201;
const ERROR_CODE = 400;
const UNDEFINED_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.status(SUCCESS_CODE).send({ data: card }))
    .catch((err) => {
      console.log(`owner: ${owner}`);
      console.log(req.body);
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные при создании карточки' })
      } else {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
      }
    });
};
module.exports.findAllCards = (req, res) => {
  Card.find({})
    .then(card => res.status(SUCCESS_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные карточек' })
      } else {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
      }
    });
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('ValidationError'))
    .then(card => res.status(SUCCESS_CODE).send({ data: card }))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        return res.status(UNDEFINED_ERROR_CODE).send({ message: ' Карточка по данному Id не найдена' })
      } else {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
      }
    });
};
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(SUCCESS_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные для постановки лайка' })
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(UNDEFINED_ERROR_CODE).send({ message: ' Передан несуществующий Id карточки' })
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
    });
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(SUCCESS_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные для снятия лайка' })
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(UNDEFINED_ERROR_CODE).send({ message: ' Передан несуществующий Id карточки' })
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
    });
}