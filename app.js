const express = require('express');
const bodyParser = require('body-parser');
require('./config/env');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

module.exports = app;
