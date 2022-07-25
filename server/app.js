const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

const postsRouter = require('./routes/postsRouter');
const usersRouter = require('./routes/usersRouter');
const citiesRouter = require('./routes/citiesRouter');
const neighborhoodsRouter = require('./routes/neighborhoodsRouter');
const globalErrorHandler = require('./controllers/globalErrorHandler');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan('dev'));

app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/cities', citiesRouter);
app.use('/api/v1/neighborhoods', neighborhoodsRouter);

app.use(globalErrorHandler);
module.exports = app;
