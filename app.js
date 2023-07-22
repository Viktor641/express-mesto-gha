const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const auth = require('./middlewares/auth');
const generalError = require('./middlewares/generalError');
const {
  CreateUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.post('/signin', login);
app.post('/signup', CreateUser);

app.use(auth);
app.use(routes);
app.use(generalError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
