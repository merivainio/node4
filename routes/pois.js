const express = require('express');
const app = express();
const router = express.Router();
const pois = require('/home/meri/node4/rest-api-example/db')

app.use(express.json());


router.get('/', ( req, res) => {
    po = pois.getPoi();
    poo = JSON.stringify(po);
    console.log(poo);

    res.status(200).send(JSON.parse(poo))
})

router.get('/:id', ( req, res) => {
    id = req.params.id;
    po = pois.getPoi(id);
    if (!po) {
        res.status(404).send('Id:tä ei ole')
    } else {
        res.status(200).send(JSON.stringify(po))
    }
})

router.post('/', ( req, res) => {

module.exports= router