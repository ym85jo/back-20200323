const Router = require('koa-router');

const groups = new Router();
const groupsCtrl = require('./ctrlGroups');

groups.get('/', groupsCtrl.list);
groups.get('/:id', groupsCtrl.get);
groups.post('/', groupsCtrl.create);
groups.delete('/', groupsCtrl.delete);
groups.put('/', groupsCtrl.replace);
groups.patch('/', groupsCtrl.update);

module.exports = groups;