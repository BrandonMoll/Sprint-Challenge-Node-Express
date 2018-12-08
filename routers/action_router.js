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
    console.log(id);
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

router.post('/', (req, res) => {
    const action = req.body;
    if(action.project_id && action.description && action.notes && action.description.length < 128) {
        db.insert(action)
        .then(actionInfo => {
            db.get(actionInfo.id)
            .then(newAction => {
                res.status(201).json(newAction)
            })
        })
        .catch(err => {
            res.status(500).json({message: 'Error in POST endpoint'})
        })
    } else {
        res.status(500).json({message: 'Please provide all data needed to create an Action'})
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(count => {
        if(count) {
            res.json({message: 'Action deleted'})
        } else {
            res.json({message: 'That Action ID does not exist'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Error in DELETE endpoint'})
    })
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const action = req.body;

    if(action.project_id && action.description && action.notes && action.description.length < 128) {
        db.update(id, action)
        .then(actionInfo => {
            if(actionInfo) {
                db.get(actionInfo.id)
                .then(updatedAction => {
                    res.json(updatedAction)
                })
            } else {
                res.status(404).json({message: 'action ID does not exist'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Error in PUT endpoint'})
        })
    } else {
        res.status(500).json({message: 'Please enter all data needed to create action'})
    }
})



module.exports = router;