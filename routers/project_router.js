const express = require('express');
const db = require('../data/helpers/projectModel')

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    db.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.status(500).json({message: 'Error in GET endpoint'})
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db.get(id)
    .then(project => {
        if(project) {
            res.json(project)
        } else {
            res.status(404).json({message: 'That project ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error in GET by ID endpoint'})
    })
})

module.exports = router;
