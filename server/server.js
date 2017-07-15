const express = require('express');
const passport = require('passport');
const { join, resolve } = require('path');
const { isLoggedIn } = require('./controllers/user');
require('dotenv').config();

const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();

require('./config/middleware')(app, passport, router);
require('./config/passport')(passport);
require('./config/routes')(app, passport, router);

app.use(express.static(join(`${__dirname}/../build`)));
app.use(express.static(join(`${__dirname}/../public`)));

app.get('/*', isLoggedIn, (request, response) => {
  response.sendFile(resolve(`${__dirname}/../public/index.html`));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
