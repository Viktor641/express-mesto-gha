const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a7148363630adcce62b10a',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

const { NOT_FOUND } = require('./utils/errors');

app.use((req, res) => {
  res.status(NOT_FOUND).send('Сервер с указанным адресом не найден');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
