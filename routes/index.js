const router = require('express').Router();
const { NOT_FOUND } = require('../utils/errors');

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Сервер с указанным адресом не найден' });
});

module.exports = router;
