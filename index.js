const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config'); 
const helmet = require('helmet');
const morgan = require('morgan'); 
const logger = require('./logger');
const courses = require('./courses');
const home = require('./home');
const auth = require('./auth');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.set('views', './views'); 
app.get('env');   

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
console.log('Mail Server: ' + config.get('mail.host'));
console.log('app name: ' + config.get('name'));  
// log requests
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    // console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...');
}
dbDebugger('Connected to the database...');
// middle ware
app.use(logger);
app.use(auth);


const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`Listening on port ${port}...`));   