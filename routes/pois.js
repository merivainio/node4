const express = require('express');
const router = express.Router();
const pois = require('../db');
const tokens = require('../tokens');

const validateToken = (req, res, next) => {
    const auth  = req.header('Authorization');
    console.log(auth);
    
    if (!auth) {
        res.status(401).send({ error: 'authorization required' });
        return;
    }

    const token = auth.split(' ')[1];
    console.log(token);

    if(!tokens.verify(token)) {
        res.status(401).send({ error: 'invalid authorization' });
        return;
    }

    next();
}

const validatePoi = (req, res, next) => {
    const poi = req.body;
    if (poi && poi.name && poi.description && poi.city && poi.coordinates.lat && poi.coordinates.lng) {
        next();
    } else {
        res.status(400).send({error: 'Puuttelliset tiedot'});
    }
}


router.get('/', ( req, res) => {

    res.status(200).send(pois.getPoi());
})

router.get('/:id', ( req, res) => {
    id = req.params.id;
    poi = pois.getPoi(id);
    if (poi) {
        res.status(200).send(poi);
    } else {
        res.status(404).send('Id:tä ei ole');
    }
});


router.post('/', validatePoi, validateToken, ( req, res) => {
    const poi = req.body;
    const newPoi = pois.createPoi(poi);
    res.status(201).send(newPoi);

});

router.put('/:id', validatePoi, validateToken, ( req, res) => {
    const poi = req.body;
    const { id } = req.params;
    
    if (!pois.getPoi(id)) {
    const newPoi = pois.setPoi(id, poi);
    res.status(201).send(newPoi);
    } else {
        const updated = pois.setPoi(id, poi);
        res.status(200).send(updated);
    }

});

router.delete('/:id', validateToken, ( req, res) => {
    const { id } = req.params;
    if(pois.deletePoi(id)) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }

});

module.exports = router;

