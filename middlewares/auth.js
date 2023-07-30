const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
    // return;
    // }
    next(err);
    // res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
