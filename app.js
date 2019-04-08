const express       = require('express');
const port          = process.env.port || 3000;
const bodyParser    = require('body-parser');
const app           = express();
const passport      = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Managing CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Mongo Db
require('./config/db');

// Routes
require('./routes');

// Passport
require('./passport');

app.use('/', index);
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);

app.listen(port, () => console.log(`The server is listenning on port ${port}`));