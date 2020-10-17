const express = require('express');
const router = express.Router();

const Model = require('model')

router.get('/', (req,res) => {
    Model.find()
    .then( result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);        
    })
    .catch( err => next(err) );
});

router.post('/',(req,res) => {
    Model.create(req.body)
    .then( result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);        
    })
    .catch( err => next(err) );
});

module.exports = router;