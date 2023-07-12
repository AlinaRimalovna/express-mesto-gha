const User = require('../models/user.js');
const SUCCESS_CODE = 201;
const ERROR_CODE = 400;
const UNDEFINED_ERROR_CODE = 404;
const INTERNAL_SERVER_ERROR_CODE = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные при создании пользователя' })
      } else {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
      }
    });
};
module.exports.findAllUsers = (req, res) => {
  User.find({})
    .then(user => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные пользователя' })
      } else {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
      }
    });
};
module.exports.findUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('ValidationError'))
    .then(user => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        return res.status(UNDEFINED_ERROR_CODE).send({ message: ' Пользователь по данному Id не найден' })
      } else {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
      }
    });
};
module.exports.updateUser = (req, res) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, { name }, { new: true })
    .orFail(new Error('ValidationError'))
    .then(user => res.status(SUCCESS_CODE).send({ data: user }))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные при обновлении пользователя' })
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(UNDEFINED_ERROR_CODE).send({ message: ' Пользователь по данному Id не найден' })
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
    });
};
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then(user => res.status(SUCCESS_CODE).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: ' Переданы некорректные данные при обновлении пользователя' })
      } if (err.name === 'DocumentNotFoundError') {
        return res.status(UNDEFINED_ERROR_CODE).send({ message: ' Пользователь по данному Id не найден' })
      }
      return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Произошла ошибка' })
    });
};