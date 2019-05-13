const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

//connect to MongoDB
mongoose.connect('mongodb://heroku_vm8mntzn:hlr6khhoa6c53ss0uagls5hbth@ds155616.mlab.com:55616/heroku_vm8mntzn',{ useNewUrlParser: true,useCreateIndex:true },function(err) {
    if(err) return console.log(err);
    else return console.log("Successfully connected to MongoDB")
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"fsgdyfgsjgfygstf67tf4376",resave:false,saveUninitialized:true}));

app.use('/', indexRouter);
module.exports = app;
