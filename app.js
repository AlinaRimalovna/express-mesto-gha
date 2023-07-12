const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/users.js');
const card = require('./routes/cards.js');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64ae45b1a93ee587d1aba6f2'
  };

  next();
});
app.use('/users', user);
app.use('/cards', card);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})