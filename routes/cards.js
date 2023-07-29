const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, findAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', findAllCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^http?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,:=]*)$/),
  }),
}), createCard);

module.exports = router;
