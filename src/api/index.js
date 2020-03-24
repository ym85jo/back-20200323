const Router = require('koa-router');

const api = new Router();

const books = require('./books');
api.use('/books', books.routes());

const subjects = require('./subjects');
api.use('/subjects', subjects.routes());

const users = require('./users');
api.use('/users', users.routes());

const groups = require('./groups');
api.use('/groups', groups.routes());

module.exports = api;