const express = require('express');

const homeController = require('./controllers/home');
const homeRoute = require('./routes/home');
const userRoute = require('./routes/user');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(homeRoute);

app.use(userRoute);

app.use(homeController.get404Page);

app.listen(3000);