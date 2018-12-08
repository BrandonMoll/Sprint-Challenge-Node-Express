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
})

module.exports = router;
