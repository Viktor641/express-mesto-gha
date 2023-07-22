const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(new NotFoundError('Сервер с указанным адресом не найден'));
});

module.exports = router;
