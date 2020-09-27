const routes = require('./api/routes/web');

const express = require('express'),
    app = express(),
    port = '1337',
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('⚡️ Railgun launch');