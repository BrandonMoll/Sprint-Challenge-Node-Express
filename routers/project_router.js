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
});

router.post('/', (req, res) => {
    const project = req.body;

    if(project.name.length < 128 && project.description) {
        db.insert(project)
        .then(idInfo => {
            db.get(idInfo.id)
            .then(newProject => {
                res.json(newProject)
            })
        })
        .catch(err => {
            res.status(500).json({message: 'Error in POST endpoint'})
        })
    } else {
        res.json({message: 'if statement not passing'})
    }

});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(count => {
        if(count) {
            res.json({message: 'Project Deleted'})
        } else {
            res.status(404).json({message: 'Project ID not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error in DELETE endpoint'})
    })
})

module.exports = router;
