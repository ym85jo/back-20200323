const Router = require('koa-router');

const api = new Router();
const books = require('./books');
api.use('/books', books.routes());

const subjects = require('./subjects');
api.use('/subjects', subjects.routes());

module.exports = api;