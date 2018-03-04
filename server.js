const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const tasks = require('./routes/tasks');

const app = express();
const port = process.env.PORT || 8080;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Static Folder to keep all Angular Page
//app.use(express.static(path.join(__dirname + 'client')));

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/src/index.html'))
});*/

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Route Page
app.use('/', index);
app.use('/api', tasks);

//Listen Server Port
app.listen(port, (req, res) => {
    console.log('Server is running on port ' + port);
});



