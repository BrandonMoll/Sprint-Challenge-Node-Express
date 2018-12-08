const express = require('express');
const db = require('../data/helpers/actionModel')

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    db.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(err => {
        res.status(500).json({message: 'Error in GET endpoint'})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db.get(id)
    .then(action => {
        if(action) {
            res.json(action)
        } else {
            res.status(404).json({message: 'Action ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error in GET by ID endpoint'})
    })
});


module.exports = router;