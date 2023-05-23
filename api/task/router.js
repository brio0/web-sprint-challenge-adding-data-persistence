// build your `/api/tasks` router here
const express = require('express')
const Tasks = require('./model')

const router = express.Router()

router.get('/', (req, res) => {
    Tasks.find()
        .then(tasks => {
            if (tasks) {
                const taskWithBoolean = tasks.map((task) => {
                    return {
                        ...task, task_completed: Boolean(task.task_completed)
                    }
                })
                res.status(200).json(taskWithBoolean)
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
                const taskWithBoolean = {
                    ...task,
                    task_completed: Boolean(task.task_completed)
                }
                res.status(201).json(taskWithBoolean)
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
