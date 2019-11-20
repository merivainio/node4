const express = require('express');
const app = express();
const port = 3000;
const pois = require('./routes/pois')
const baseURL = '/api/v1';

app.use(express.json());

app.use(baseURL + '/pois', pois)

app.listen(3000, () => 
console.log(`Server listening on ${port}!`))