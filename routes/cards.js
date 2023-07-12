const router = require('express').Router();
const { createCard, findAllCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards.js');

router.post('/', createCard);
router.get('/', findAllCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;