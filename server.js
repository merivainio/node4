const express = require('express');
const app = express();
const port = 3000;
const morgan= require('morgan');
const pois = require('/home/meri/node4/rest-api-example/routes/pois')

app.use(morgan('dev'));

app.use('/pois', pois)

app.listen(3000, () => 
console.log(`Server listening on ${port}!`))