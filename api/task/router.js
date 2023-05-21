// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Tasks.find()
        .then(task => {
            if (task) {
                res.status(200).json(task)
            } else {
                return []
            }

        })
        .catch(err => {
            res.status(500).json({
                message: "error fetching tasks",
                err: err.message,
                stack: err.stack
            })
        })
})

router.post('/', (req, res) => {
    const { task_description, task_notes, task_completed, project_id } = req.body

    if (!task_description || !project_id) {
        res.status(400).json({
            message: "Please provide task description and project id"
        })
    } else {
        Tasks.postTask({ task_description, task_notes, task_completed, project_id })
            .then(task => {
                res.status(201).json(task)
            })
            .catch(err => {
                res.status(500).json({
                    message: "error posting tasks",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})

module.exports = router
