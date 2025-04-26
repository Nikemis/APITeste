require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.status(200).send('<h1>Ola Mundo</h1>');
});

app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;