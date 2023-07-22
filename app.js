const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const generalError = require('./middlewares/generalError');
const {
  CreateUser,
  login,
} = require('./controllers/users');

const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, CreateUser);

app.use(auth);
app.use(errors());
app.use(routes);
app.use(generalError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
