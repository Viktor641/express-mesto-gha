// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BedRequestError = require('../errors/BedRequestError');

const CreateUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BedRequestError('Переданы некорректные данные при создании пользователя.');
      } else if (err.code === 11000) {
        throw new ConflictError('Такой email уже существует на сервере.');
      }
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      } else if (err.name === 'CastError') {
        throw new BedRequestError('Переданы некорректные данные пользователя');
      }
    })
    .catch(next);
};

const patchProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BedRequestError('Переданы некорректные данные при обновлении профиля.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
    })
    .catch(next);
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new Error('NotFound'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BedRequestError('Переданы некорректные данные при обновлении аватара.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getAuthUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error('NotFound'))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BedRequestError('Переданы некорректные данные пользователя.');
      } else if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
    })
    .catch(next);
};

module.exports = {
  CreateUser,
  getUsers,
  getUser,
  patchProfile,
  patchAvatar,
  login,
  getAuthUser,
};
