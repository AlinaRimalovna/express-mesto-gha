const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  console.log('123')
  const token = req.cookies.jwt;
  console.log(token)
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    if (err.code === 401) {
      next(new Unauthorized('Необходима авторизация'));
    }
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
