const Router = require('koa-router');

const users = new Router();
const usersCtrl = require('./ctrlUsers');

users.get('/', usersCtrl.list);
users.get('/:id', usersCtrl.get);
users.post('/', usersCtrl.create);
users.delete('/', usersCtrl.delete);
users.put('/', usersCtrl.replace);
users.patch('/', usersCtrl.update);

module.exports = users;