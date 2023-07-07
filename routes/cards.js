const router = require('express').Router();
const {
  CreateCard,
  getCards,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

router.post('/', CreateCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', disLikeCard);

module.exports = router;
