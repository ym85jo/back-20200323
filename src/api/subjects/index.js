const Router = require('koa-router');

const subjects = new Router();
const subjectsCtrl = require('./ctrlSubjects');

subjects.get('/', subjectsCtrl.list);
subjects.post('/', subjectsCtrl.create);
subjects.delete('/', subjectsCtrl.delete);
subjects.put('/', subjectsCtrl.replace);
subjects.patch('/', subjectsCtrl.update);

module.exports = subjects;