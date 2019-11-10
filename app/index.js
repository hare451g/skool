const App = require('express')();
const BodyParser = require('body-parser');
const cors = require('cors');

// require services
const roleService = require('./services/roleService');
const academicYearService = require('./services/academicYearService');
const majorService = require('./services/majorService');
const degreeService = require('./services/degreeService');
const subjectService = require('./services/subjectService');
const userService = require('./services/userService');

// set middlewares
App.use(BodyParser.json());
App.use('*', cors());

// set services
App.use('/roles', roleService);
App.use('/academic-year', academicYearService);
App.use('/major', majorService);
App.use('/degree', degreeService);
App.use('/subject', subjectService);
App.use('/user', userService);
App.get('*', (req, res) => res.status(404).json({ message: 'not found !' }));

module.exports = App;
